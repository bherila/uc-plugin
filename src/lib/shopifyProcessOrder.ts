import z from 'zod'
import db from '@/lib/db'
import { V3Manifest } from '@/app/api/manifest/models'
import groupBySku from '@/lib/groupBySku'
import shopify from '@/lib/shopify'
import shopifyGetOrdersWithLineItems from '@/lib/shopifyGetOrdersWithLineItems'

async function log(
  msg: any,
  offerId: number | null,
  orderIdNumeric: bigint | null,
  timeTakenMs: number | null = null,
) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query(
    'insert into v3_audit_log (event_ts, event_name, event_ext, offer_id, order_id, time_taken_ms) values (?, ?, ?, ?, ?, ?)',
    [
      new Date().toISOString(),
      'shopifyProcessOrder',
      txt,
      offerId ?? null,
      orderIdNumeric?.toString() ?? null,
      timeTakenMs?.toString() ?? null,
    ],
  )
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

    const dealLineItemFromShopifyOrder = shopifyOrder.lineItems.nodes.filter((node) =>
      node.product.tags.includes('deal'),
    )

    // map the variant to the order and stash this so we can query for the order later
    const purchasedDealFields = dealLineItemFromShopifyOrder.map((node) => [
      orderIdUri, // order id
      node.variant.variant_graphql_id, // variant id
      offerIdFromVariantId.get(node.variant.variant_graphql_id), // offer id
    ])
    if (purchasedDealFields.length !== 1) {
      await log(
        `ERROR: Multiple deals for order ${orderIdNumeric}: ${JSON.stringify(purchasedDealFields)}`,
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
      if (!orderLineItem.discountedTotalSet.shopMoney.amount) {
        console.info('Skip free item ' + orderLineItem.line_item_id)
        continue
      }
      const lineItemVariantId = orderLineItem.variant.variant_graphql_id
      offerId = offerIdFromVariantId.get(lineItemVariantId) ?? null
      if (!offerId) {
        pushLog(`LineItem: ${orderLineItem.line_item_id} => No match to offer for variant ${lineItemVariantId}`)
        continue
      } else {
        pushLog(
          `LineItem: ${orderLineItem.line_item_id} => Match offer_id: ${offerId} for variant ${lineItemVariantId}`,
        )
      }

      const assigneeId = orderIdUri
      const existingManifests: { c: number }[] = await db.query(
        'select count(*) as c from v3_offer_manifest where assignee_id = ? and offer_id = ?',
        [assigneeId, offerId],
      )
      const alreadyHaveQty = z.number().parse(existingManifests[0].c)
      const needQty =
        shopifyOrder.cancelledAt == null
          ? orderLineItem.quantity - alreadyHaveQty // ALLOCATE if not canceled
          : -alreadyHaveQty // RELEASE if canceled
      pushLog(`${alreadyHaveQty} already allocated to ${assigneeId}, need ${needQty} more`)
      if (needQty > 0) {
        // ALLOCATE bottles.
        const updateResult = await db.query(
          `
            UPDATE v3_offer_manifest
            SET assignee_id = ?
            WHERE offer_id = ?
              AND assignee_id IS NULL
            ORDER BY assignment_ordering
            LIMIT ?;
          `,
          [assigneeId, offerId, needQty],
        )
        pushLog(updateResult)
      } else if (needQty < 0) {
        // RELEASE (unallocate) bottles
        const updateResult = await db.query(
          `
            UPDATE v3_offer_manifest
            SET assignee_id = null
            WHERE assignee_id = ?
              AND offer_id = ?
            ORDER BY assignment_ordering
            LIMIT ?;
          `,
          [assigneeId, offerId, -needQty],
        )
        pushLog(updateResult)
      }

      const offerManifests: V3Manifest[] = await db.query(
        `select m_id as id, mf_variant as variant_id, assignee_id, assignment_ordering
          from v3_offer_manifest
          where assignee_id = ? and offer_id = ?
          order by mf_variant`,
        [assigneeId, offerId],
      )

      const preExistingShopifyManifests = shopifyOrder.lineItems.nodes.filter((node) =>
        node.product.tags.includes('manifest-item'),
      )

      // remove pre-existing manifests from shopify order
      if (preExistingShopifyManifests.length > 0) {
        pushLog(
          `Cannot proceed until all ${preExistingShopifyManifests.length} pre-existing manifests are deleted from Shopify order`,
        )
        return
        // const beginEditResult = await beginEdit({ orderId: orderIdUri })
        // calculatedOrderId = beginEditResult.orderEditBegin?.calculatedOrder?.id ?? null
        // if (!calculatedOrderId) {
        //   await log('CalculatedOrder.id was null, aborting', offerId, orderIdNumeric)
        //   return
        // }
        // await log(`Opened CalculatedOrder ${calculatedOrderId}`, offerId, orderIdNumeric)
        // ... do stuff
        // const commitResult = await orderEditCommit({ calculatedOrderId })
        // await log(commitResult, offerId, orderIdNumeric)
      }

      const willUpdateShopifyOrder = preExistingShopifyManifests.length < offerManifests.length
      pushLog(
        `${willUpdateShopifyOrder ? 'Will update' : 'Will not update'} shopify order, checked if ${preExistingShopifyManifests.length} < ${offerManifests.length}`,
      )
      if (willUpdateShopifyOrder) {
        if (calculatedOrderId == null) {
          const beginEditResult = await beginEdit({ orderId: orderIdUri })
          calculatedOrderId = beginEditResult.orderEditBegin?.calculatedOrder?.id ?? null
          if (!calculatedOrderId) {
            pushLog('CalculatedOrder.id was null, aborting')
            return
          }
          pushLog(`Opened CalculatedOrder ${calculatedOrderId}`)
        }

        const groups = groupBySku(offerManifests)
        for (const variantId of Object.keys(groups)) {
          const x: AddVariantInput = {
            calculatedOrderId,
            quantity: groups[variantId].length,
            variantId,
          }

          // add the item to the order
          pushLog(`Adding ${variantId} x ${groups[variantId].length}, ${JSON.stringify(x)}`)
          const addResult = await addVariant(x)
          const allocationLineItem = addResult.orderEditAddVariant
          pushLog(`addVariant: ${JSON.stringify(addResult)}`)
          // with a zero cost i.e. 100% discount
          const discount = await addDiscount({
            calculatedOrderId,
            discount: {
              percentValue: 100,
              description: 'Allocation from Offer',
            },
            lineItemId: allocationLineItem.calculatedLineItem.id,
          })

          pushLog('addDiscount: ' + JSON.stringify(discount))
        }
      }
    }

    if (calculatedOrderId != null) {
      const commitResult = await orderEditCommit({ calculatedOrderId })
      pushLog('orderEditCommit: ' + JSON.stringify(commitResult))
    }

    await Promise.allSettled(logPromises)
    pushLog(`done in ${Date.now() - startTime}ms`)
  } finally {
    await Promise.allSettled(logPromises)
    await db.end()
  }
}

// these from https://shopify.dev/docs/apps/build/orders-fulfillment/order-management-apps/edit-orders#add-a-new-variant
// genAI: For each of these graphql mutations, please write async typescript functions that take in the relevant input arguments strongly typed and return an object  parsed by zod schema. Assume "shopify" object is already constructed as a global variable from shopify-api-node, and we can use "await shopify.graphql(query, params)" to execute them. For the OrderEditAppliedDiscountInput, refer to the shopify GraphQL API for the correct object type definition.

const GQL_BEGIN_EDIT = `
mutation beginEdit($order_id: ID!){
 orderEditBegin(id: $order_id){
    calculatedOrder{
      id
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
  }
}`

const GQL_ADD_VARIANT = `
mutation orderEditAddVariant($calculatedOrderId: ID!, $quantity: Int!, $variantId: ID!) {
  orderEditAddVariant(id: $calculatedOrderId, quantity: $quantity, variantId: $variantId, allowDuplicates: false) {
    calculatedLineItem {
      # CalculatedLineItem fields
      id
    }
    calculatedOrder {
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`

const GQL_ADD_DISCOUNT = `
mutation orderEditAddLineItemDiscount($discount: OrderEditAppliedDiscountInput!, $calculated_order_id: ID!, $line_item_id: ID!) {
  orderEditAddLineItemDiscount(discount: $discount, id: $calculated_order_id, lineItemId: $line_item_id) {
    addedDiscountStagedChange {
      # OrderStagedChangeAddLineItemDiscount fields
      id
      description
      value {
        __typename
      }
    }
    calculatedLineItem {
      # CalculatedLineItem fields
      id
      sku
      variant {
        title
        id
      }
    }
    userErrors {
      field
      message
    }
  }
}`

const GQL_ORDER_EDIT_COMMIT = `
mutation orderEditCommit($calculated_order_id: ID!) {
  orderEditCommit(id: $calculated_order_id, notifyCustomer: true) {
    order {
      # Order fields
      id
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`

// generated

const beginEditSchema = z.object({
  orderEditBegin: z
    .object({
      calculatedOrder: z
        .object({
          id: z.string(),
          totalPriceSet: z
            .object({
              shopMoney: z
                .object({
                  amount: z.string(),
                  currencyCode: z.string(),
                })
                .nullable(),
            })
            .nullable(),
        })
        .nullable(),
    })
    .nullable(),
})

type BeginEditInput = {
  orderId: string
}

type BeginEditResponse = z.infer<typeof beginEditSchema>

async function beginEdit({ orderId }: BeginEditInput): Promise<BeginEditResponse> {
  const response = await shopify.graphql(GQL_BEGIN_EDIT, { order_id: orderId })
  return beginEditSchema.parse(response)
}

const addVariantSchema = z.object({
  orderEditAddVariant: z.object({
    calculatedLineItem: z.object({
      id: z.string(),
    }),
    calculatedOrder: z.object({
      totalPriceSet: z
        .object({
          shopMoney: z.object({
            amount: z.string(),
            currencyCode: z.string(),
          }),
        })
        .nullable(),
    }),
    userErrors: z.any().nullable(),
  }),
})

type AddVariantInput = {
  calculatedOrderId: string
  quantity: number
  variantId: string
}

type AddVariantResponse = z.infer<typeof addVariantSchema>

async function addVariant(input: AddVariantInput): Promise<AddVariantResponse> {
  const response = await shopify.graphql(GQL_ADD_VARIANT, input)
  return addVariantSchema.parse(response)
}

const addDiscountSchema = z.object({
  orderEditAddLineItemDiscount: z.object({
    addedDiscountStagedChange: z.object({
      id: z.string(),
      description: z.string().nullable(),
      value: z
        .object({
          __typename: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
    }), // Add fields as needed
    calculatedLineItem: z.object({
      id: z.string(),
      sku: z.string().nullable(),
      variant: z.object({
        title: z.string().nullable(),
        id: z.string(),
      }),
    }),
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()),
          message: z.string(),
        }),
      )
      .nullable(),
  }),
})

interface OrderEditAppliedDiscountInput {
  percentValue?: number
  description?: string
}

type AddDiscountInput = {
  discount: OrderEditAppliedDiscountInput
  calculatedOrderId: string
  lineItemId: string
}

type AddDiscountResponse = z.infer<typeof addDiscountSchema>

async function addDiscount({
  discount,
  calculatedOrderId,
  lineItemId,
}: AddDiscountInput): Promise<AddDiscountResponse> {
  const response = await shopify.graphql(GQL_ADD_DISCOUNT, {
    discount,
    calculated_order_id: calculatedOrderId,
    line_item_id: lineItemId,
  })
  return addDiscountSchema.parse(response)
}

const orderEditCommitSchema = z.object({
  orderEditCommit: z.object({
    order: z
      .object({
        id: z.string(),
        totalPriceSet: z.object({
          shopMoney: z.object({
            amount: z.string(),
            currencyCode: z.string(),
          }),
        }),
      })
      .nullable(),
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()),
          message: z.string(),
        }),
      )
      .nullable(),
  }),
})

type OrderEditCommitInput = {
  calculatedOrderId: string
}

type OrderEditCommitResponse = z.infer<typeof orderEditCommitSchema>

async function orderEditCommit({
  calculatedOrderId,
}: OrderEditCommitInput): Promise<OrderEditCommitResponse | null> {
  let response
  try {
    response = await shopify.graphql(GQL_ORDER_EDIT_COMMIT, {
      calculated_order_id: calculatedOrderId,
    })
    return orderEditCommitSchema.parse(response)
  } catch {
    return response as any
  }
}

// end generated
