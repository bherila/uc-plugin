import 'server-only'
import db from '@/server_lib/db'
import groupBySku from '@/lib/groupBySku'
import shopifyGetOrdersWithLineItems from '@/server_lib/shopifyGetOrdersWithLineItems'
import SkuManifestGrouping from '@/lib/SkuManifestGrouping'
import z from 'zod'

import { addDiscount } from './shopifyAddDiscount'
import { addVariant } from './shopifyAddVariant'
import { orderEditCommit } from './shopifyOrderEditCommit'
import { prisma } from '@/server_lib/prisma'
import { ResultSetHeader } from 'mysql2'
import { shopifyBeginOrderEdit } from './shopifyBeginOrderEdit'
import { shopifyCancelOrder } from './shopifyCancelOrder'
import { shopifySetLineItemQuantity } from './shopifySetLineItemQuantity'
import { shopifySetVariantQuantity } from './shopifySetVariantQuantity'
import { V3Manifest } from '@/app/api/manifest/models'

export const maxDuration = 60

interface ShopOrderMutation {
  variantId: string
  qty: number
  updateLineItemId: string | null // null will create a new line item
}

async function log(
  msg: any,
  offerId: number | null,
  orderIdNumeric: bigint | null,
  timeTakenMs: number | null = null,
) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await prisma.v3_audit_log.create({
    data: {
      event_name: 'shopifyProcessOrder',
      event_ext: txt,
      offer_id: offerId ?? undefined,
      order_id: orderIdNumeric ?? undefined,
      time_taken_ms: timeTakenMs ?? undefined,
    },
  })
  console.info('[allocate] ' + txt)
}

export default async function shopifyProcessOrder(orderIdX: string) {
  const logPromises: Promise<void>[] = []
  const startTime = Date.now()
  try {
    const orderIdNumeric = z.coerce.bigint().safeParse(orderIdX.replace('gid://shopify/Order/', ''))?.data ?? null
    const orderIdUri = `gid://shopify/Order/${orderIdNumeric}`
    const shopifyOrder = (await shopifyGetOrdersWithLineItems([orderIdUri]))[0]
    const dealSchema = z.object({
      offer_id: z.number(),
      offer_variant_id: z.string(),
    })
    const deals = z.array(dealSchema).parse(await db.query(`select offer_id, offer_variant_id from v3_offer`))
    const offerIdFromVariantId = new Map<string, number>()
    for (const deal of deals) {
      offerIdFromVariantId.set(deal.offer_variant_id, deal.offer_id)
    }

    // we will get the calculated order id from beginEdit below.
    let calculatedOrderId: string | null = null
    let offerId: number | null = null

    // combine dealLineItemFromShopifyOrder by variant_graphql_id (adding up quantities)
    const variant2DealItemMap = new Map<string, (typeof shopifyOrder.lineItems_nodes)[0]>()
    for (const dealLineItem of shopifyOrder.lineItems_nodes) {
      if (dealLineItem.product_tags.includes('deal')) {
        const key = dealLineItem.variant_variant_graphql_id
        const existingItem = variant2DealItemMap.get(key)
        if (existingItem != null) {
          existingItem.quantity += dealLineItem.quantity
        } else {
          variant2DealItemMap.set(key, dealLineItem)
        }
      }
    }
    const dealLineItemFromShopifyOrder = Array.from(variant2DealItemMap.values())

    // map the variant to the order and stash this so we can query for the order later
    const purchasedDealFields = dealLineItemFromShopifyOrder.map((node) => [
      orderIdUri, // order id
      node.variant_variant_graphql_id, // variant id
      offerIdFromVariantId.get(node.variant_variant_graphql_id), // offer id
    ])
    if (purchasedDealFields.length !== 1) {
      await log(
        `ERROR: Multiple deals for order ${orderIdNumeric}: ${JSON.stringify(purchasedDealFields)}`,
        null,
        orderIdNumeric,
      )
      return
    }

    const purchasedDealVariantUri = purchasedDealFields[0][1]?.toString() ?? null
    if (purchasedDealVariantUri == null) {
      await log(
        `ERROR: No deal for order ${orderIdNumeric}: ${JSON.stringify(purchasedDealFields)}`,
        null,
        orderIdNumeric,
      )
      return
    }

    await db.query(`replace into v3_order_to_variant (order_id, variant_id, offer_id) values ?`, [
      purchasedDealFields,
    ])

    function pushLog(msg: any) {
      logPromises.push(log(msg, offerId, orderIdNumeric, Date.now() - startTime))
    }

    for (const orderLineItem of dealLineItemFromShopifyOrder) {
      if (!orderLineItem.discountedTotalSet_shopMoney_amount) {
        console.info('Skip free item ' + orderLineItem.line_item_id)
        continue
      }
      const lineItemVariantId = orderLineItem.variant_variant_graphql_id
      offerId = offerIdFromVariantId.get(lineItemVariantId) ?? null
      if (!offerId) {
        pushLog(`LineItem: ${orderLineItem.line_item_id} => No match to offer for variant ${lineItemVariantId}`)
        continue
      } else {
        pushLog(
          `LineItem: ${orderLineItem.line_item_id} => Match offer_id: ${offerId} for variant ${lineItemVariantId}`,
        )
      }

      const existingManifests: { c: number }[] = await db.query(
        'select count(*) as c from v3_offer_manifest where assignee_id = ? and offer_id = ?',
        [orderIdUri, offerId],
      )
      const alreadyHaveQty = z.number().parse(existingManifests[0].c)
      const needQty =
        shopifyOrder.cancelledAt == null
          ? orderLineItem.quantity - alreadyHaveQty // ALLOCATE if not canceled
          : -alreadyHaveQty // RELEASE if canceled

      pushLog(`${alreadyHaveQty} already allocated to ${orderIdUri}, need ${needQty} more`)

      if (needQty > 0) {
        // ALLOCATE bottles.
        const updateResult: ResultSetHeader = await db.query(
          `
            UPDATE v3_offer_manifest
            SET assignee_id = ?
            WHERE offer_id = ?
              AND assignee_id IS NULL
            ORDER BY assignment_ordering
            LIMIT ?;
          `,
          [orderIdUri, offerId, needQty],
        )
        const rowsAffected = updateResult.affectedRows

        if (rowsAffected < needQty) {
          // Set the assignee_id for those rows back to null
          // Set the assignee_id for those rows back to null
          const rowsReverted = (
            (await db.query(
              `
              UPDATE v3_offer_manifest
              SET assignee_id = null
              WHERE assignee_id = ?
          AND offer_id = ?
              ORDER BY assignment_ordering
              LIMIT ?;
            `,
              [orderIdUri, offerId, rowsAffected],
            )) as ResultSetHeader
          ).affectedRows
          pushLog(`Reverted ${rowsReverted} of ${rowsAffected} rows due to insufficient allocation`)

          // Call shopifyCancelOrder and shopifySetVariantQty
          pushLog(`Attempting to cancel order ${orderIdUri}`)
          try {
            await shopifyCancelOrder(orderIdUri)
          } catch (error) {
            pushLog(error)
          }

          pushLog(`Set variant quantity to 0 for offer ${offerIdFromVariantId.get(orderIdUri)}`)
          try {
            await shopifySetVariantQuantity(purchasedDealVariantUri, 0)
          } catch (error) {
            pushLog(error)
          }
        }
      } else if (needQty < 0) {
        // RELEASE (unallocate) bottles
        const updateResult: ResultSetHeader = await db.query(
          `UPDATE v3_offer_manifest
            SET assignee_id = null
            WHERE assignee_id = ?
              AND offer_id = ?
            ORDER BY assignment_ordering
            LIMIT ?`,
          [orderIdUri, offerId, -needQty],
        )
        pushLog(`Reverted ${updateResult.affectedRows} of ${-needQty} rows due to release`)
      }
    }

    // Now that the manifests are allocated, we need to update the shopify order

    const offerManifests: V3Manifest[] = await db.query(
      `select m_id as id, mf_variant as variant_id, assignee_id, assignment_ordering
          from v3_offer_manifest
          where assignee_id = ? and offer_id = ?
          order by mf_variant`,
      [orderIdUri, offerId],
    )

    const preExistingShopifyManifests = shopifyOrder.lineItems_nodes.filter((node) =>
      node.product_tags.includes('manifest-item'),
    )

    // Reconcile offerManifests vs. preExistingShopifyManifests
    const actions: ShopOrderMutation[] = []
    const groups: SkuManifestGrouping = groupBySku(offerManifests)
    for (const variantId of Object.keys(groups)) {
      const group = groups[variantId]
      const variant_id = group[0].variant_id
      const existing = preExistingShopifyManifests.filter(
        (node) => node.variant_variant_graphql_id === variant_id,
      )
      if (existing.length > 1) {
        pushLog(`ERROR: Multiple existing items for variantId ${variantId}: ${JSON.stringify(existing)}`)
      } else if (existing.length === 1) {
        actions.push({
          updateLineItemId: existing[0].line_item_id,
          qty: group.length,
          variantId: variant_id,
        })
      } else {
        actions.push({
          updateLineItemId: null,
          qty: group.length,
          variantId: variant_id,
        })
      }
    }
    // Apply to shopify order
    if (actions.length > 0) {
      // Start the order edit if needed
      if (calculatedOrderId == null) {
        const beginEditResult = await shopifyBeginOrderEdit({ orderId: orderIdUri })
        calculatedOrderId = beginEditResult.calculatedOrderId
        if (!calculatedOrderId) {
          pushLog('CalculatedOrderId was null, aborting')
          return // do not commit, error!!
        }
        pushLog(`Opened CalculatedOrder ${calculatedOrderId}`)
      }

      for (const action of actions) {
        const { qty, variantId, updateLineItemId } = action
        let calculatedLineItemIdForDiscounting: string | null = null
        if (updateLineItemId) {
          // update the line item
          pushLog(`Updating line item ${updateLineItemId} to ${qty} for variant ${variantId}`)
          const updateResult = await shopifySetLineItemQuantity(calculatedOrderId, updateLineItemId, qty)
          calculatedLineItemIdForDiscounting = updateResult.calculated_lineitem_id
        } else {
          // add line item
          pushLog(`Adding line item ${variantId} to ${qty} for variant ${variantId}`)
          const addResult = await addVariant({
            calculatedOrderId,
            quantity: qty,
            variantId,
          })
          calculatedLineItemIdForDiscounting = addResult.orderEditAddVariant.calculatedLineItem.id
        }
        // with a zero cost i.e. 100% discount
        const discount = await addDiscount({
          calculatedOrderId,
          discount: {
            percentValue: 100,
            description: 'Allocation from Offer',
          },
          lineItemId: calculatedLineItemIdForDiscounting,
        })
        pushLog('addDiscount: ' + JSON.stringify(discount))
      }

      if (calculatedOrderId != null) {
        const commitResult = await orderEditCommit({ calculatedOrderId })
        pushLog('orderEditCommit: ' + JSON.stringify(commitResult))
      }
    }

    await Promise.allSettled(logPromises)
    pushLog(`done in ${Date.now() - startTime}ms`)
  } finally {
    await Promise.allSettled(logPromises)
    await db.end()
  }
}
