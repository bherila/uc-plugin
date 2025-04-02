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
import { shopifyOrderCapture } from './shopifyOrderCapture'
import { V3Manifest } from '@/app/api/manifest/models'

export const maxDuration = 60

interface ShopOrderMutation {
  variantId: string
  qty: number
  updateLineItemId?: string // null will create a new line item
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
}

const orderLocks = new Set<string>()

export default async function shopifyProcessOrder(orderIdX: string) {
  if (orderLocks.has(orderIdX)) {
    console.error(`Order ${orderIdX} is already being processed, skipping`)
    return
  }
  orderLocks.add(orderIdX)
  const logPromises: Promise<void>[] = []
  const startTime = Date.now()
  try {
    processOrderInternal(orderIdX, logPromises, startTime)
  } finally {
    await Promise.allSettled(logPromises)
    await db.end()
    orderLocks.delete(orderIdX)
  }
  console.info(`done in ${Date.now() - startTime}ms`)
}

async function processOrderInternal(orderIdX: string, logPromises: Promise<void>[], startTime: number) {
  const orderIdNumeric = z.coerce.bigint().safeParse(orderIdX.replace('gid://shopify/Order/', ''))?.data ?? null
  const orderIdUri = `gid://shopify/Order/${orderIdNumeric}`
  const shopifyOrder = (await shopifyGetOrdersWithLineItems([orderIdUri]))[0]
  const dealSchema = z.object({
    offer_id: z.number(),
    offer_variant_id: z.string(),
  })

  let offerId: number | null = null

  // combine dealLineItemFromShopifyOrder by variant_graphql_id (adding up quantities)
  const variant2DealItemMap = new Map<string, (typeof shopifyOrder.lineItems_nodes)[0]>()
  for (const dealLineItem of shopifyOrder.lineItems_nodes) {
    // console.info(`Reading line item ${dealLineItem.line_item_id} with tags ${dealLineItem.product_tags} and variant id ${dealLineItem.variant_variant_graphql_id}`)
    if (dealLineItem.product_tags.includes('deal')) {
      const key = dealLineItem.variant_variant_graphql_id
      const existingItem = variant2DealItemMap.get(key)
      if (existingItem != null) {
        console.info(
          `Combining line item ${dealLineItem.line_item_id} with existing item ${existingItem.line_item_id}`,
        )
        existingItem.quantity += dealLineItem.quantity
      } else {
        console.info(`Adding line item ${dealLineItem.line_item_id} to map`)
        variant2DealItemMap.set(key, dealLineItem)
      }
    }
  }
  console.info(
    `Found ${variant2DealItemMap.size} deal line items, keys = ${Array.from(variant2DealItemMap.keys())}`,
  )

  // Update the v3_order_to_variant (begin)======
  const deals = z.array(dealSchema).parse(await db.query(`select offer_id, offer_variant_id from v3_offer`))
  const offerIdFromVariantId = new Map<string, number>()
  for (const deal of deals) {
    offerIdFromVariantId.set(deal.offer_variant_id, deal.offer_id)
  }
  const purchasedDealFields = Array.from(variant2DealItemMap.values())
    .map((item) => {
      const variantId = item.variant_variant_graphql_id
      const offerId = offerIdFromVariantId.get(variantId) ?? null
      return [orderIdUri, variantId, offerId]
    })
    .filter((item) => item[2] != null)
  console.info(`Updating v3_order_to_variant with ${purchasedDealFields.length} items`)
  await db.query(`replace into v3_order_to_variant (order_id, variant_id, offer_id) values ?`, [
    purchasedDealFields,
  ])
  // Update the v3_order_to_variant (end)======

  function pushLog(msg: any) {
    logPromises.push(log(msg, offerId, orderIdNumeric, Date.now() - startTime))
    console.info('[allocate] ' + msg)
  }

  const keys = Array.from(variant2DealItemMap.keys())
  console.info(`Processing ${keys.length} variants, `, keys)
  for (const orderedVariant of keys) {
    console.info(`Processing variant ${orderedVariant}`)
    const orderLineItem = variant2DealItemMap.get(orderedVariant)!
    const purchasedDealVariantUri = orderLineItem.variant_variant_graphql_id
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

  // Sanity check offerManifest length against dealLineItemFromShopifyOrder total qty
  const totalQty = offerManifests.length
  const totalQtyFromShopifyOrder = Array.from(variant2DealItemMap.values()).reduce(
    (acc, item) => acc + item.quantity,
    0,
  )
  if (totalQty !== totalQtyFromShopifyOrder) {
    console.error(`Sanity check failed: ${totalQty} manifests vs ${totalQtyFromShopifyOrder} from Shopify order`)
    return
  }

  // Start the order edit if needed
  const { calculatedOrderId, editableLineItems } = await shopifyBeginOrderEdit({ orderId: orderIdUri })
  if (!calculatedOrderId) {
    pushLog('CalculatedOrderId was null, aborting')
    return // do not commit, error!!
  }
  pushLog(`Opened CalculatedOrder ${calculatedOrderId}`)

  const preExistingShopifyManifests = editableLineItems.filter((node) =>
    node.productTags.includes('manifest-item'),
  )

  // Reconcile offerManifests vs. preExistingShopifyManifests
  const actions: ShopOrderMutation[] = []
  const groups: SkuManifestGrouping = groupBySku(offerManifests)
  for (const variantId of Object.keys(groups)) {
    const group = groups[variantId]
    const existing = preExistingShopifyManifests.filter((node) => node.variantId === variantId)
    const combinedQtyExisting = existing.reduce((acc, node) => acc + node.quantity, 0)
    console.info(
      `Mf group ${variantId} has ${group.length} manifests and ${combinedQtyExisting} existing line items qty`,
    )
    if (combinedQtyExisting > 0) {
      if (combinedQtyExisting != group.length) {
        console.info(
          `Updating line item ${existing[0].calculatedLineItemId} for variant ${variantId} from ${combinedQtyExisting} to ${group.length}`,
        )
        actions.push({
          updateLineItemId: existing[0].calculatedLineItemId,
          qty: group.length,
          variantId: variantId,
        })

        // Delete extra line items
        if (existing.length > 1) {
          for (let i = 1; i < existing.length; ++i) {
            console.info(`Deleting extra line item ${existing[i].calculatedLineItemId} for variant ${variantId}`)
            actions.push({
              updateLineItemId: existing[i].calculatedLineItemId,
              qty: 0,
              variantId: variantId,
            })
          }
        }
      }
    } else {
      console.info(`Adding new line item for ${variantId} with qty ${group.length}`)
      actions.push({
        qty: group.length,
        variantId: variantId,
      })
    }
  }
  // Apply to shopify order
  if (actions.length > 0) {
    for (const action of actions) {
      const { qty, variantId, updateLineItemId } = action
      if (updateLineItemId) {
        // update the line item
        const updateResult = await shopifySetLineItemQuantity(calculatedOrderId, updateLineItemId, qty)
        pushLog(
          `Updating line item ${updateLineItemId} to ${qty} for variant ${variantId} - ${JSON.stringify(updateResult)}`,
        )
      } else {
        // add line item
        const addResult = await addVariant({
          calculatedOrderId,
          quantity: qty,
          variantId,
        })
        pushLog(`Adding line item ${variantId} to ${qty} for variant ${variantId} - ${JSON.stringify(addResult)}`)
        // with a zero cost i.e. 100% discount
        const discount = await addDiscount({
          calculatedLineItemId: addResult.orderEditAddVariant.calculatedLineItem.id,
          calculatedOrderId,
          discount: {
            percentValue: 100,
            description: 'Allocation from Offer',
          },
        })
        pushLog('addDiscount: ' + JSON.stringify(discount))
      }
    }
    const commitResult = await orderEditCommit({ calculatedOrderId })
    pushLog('orderEditCommit - ' + JSON.stringify(commitResult))
  } else {
    pushLog('SKIP orderEditCommit - Nothing to do')
  }

  // if (shopifyOrder.totalPriceSet_shopMoney_amount > 0) {
  //   try {
  //     // Check if the order is already captured
  //     const isAlreadyCaptured = shopifyOrder.displayFinancialStatus === 'CAPTURED'

  //     if (!isAlreadyCaptured) {
  //       const captureResult = await shopifyOrderCapture({
  //         id: orderIdUri,
  //         parentTransactionId: `gid://shopify/OrderTransaction/${shopifyOrder.transactions_nodes[0]?.id ?? ''}`,
  //         amount: shopifyOrder.totalPriceSet_shopMoney_amount.toFixed(2),
  //       })
  //       pushLog(`Order capture result: ${JSON.stringify(captureResult)}`)
  //     } else {
  //       pushLog(`Order ${orderIdUri} already captured, skipping capture`)
  //     }
  //   } catch (captureError) {
  //     pushLog(
  //       `Order capture failed: ${captureError instanceof Error ? captureError.message : String(captureError)}`,
  //     )
  //   }
  // } else {
  //   pushLog(`Order ${orderIdUri} is free, no capture needed`)
  // }
}
