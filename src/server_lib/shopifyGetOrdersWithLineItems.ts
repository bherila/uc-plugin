import 'server-only'
import { z } from 'zod'
import shopify from '@/server_lib/shopify'
import { cache } from 'react'

const orderLineItem = z.object({
  line_item_id: z.string(),
  quantity: z.number(),
  title: z.string(),
  product: z.object({
    tags: z.array(z.string()),
  }),
  variant: z.object({
    variant_graphql_id: z.string(),
    inventoryItem: z
      .object({
        id: z.string(),
        measurement: z.object({
          id: z.string(),
          weight: z.object({
            unit: z.string(),
            value: z.number(),
          }),
        }),
      })
      .nullable(),
  }),
  originalUnitPriceSet: z.object({
    shopMoney: z.object({
      amount: z.coerce.number(),
    }),
  }),
  discountedTotalSet: z.object({
    shopMoney: z.object({
      amount: z.coerce.number(),
    }),
  }),
})

export const orderLineItemFlatSchema = z.object({
  line_item_id: z.string(),
  quantity: z.number(),
  title: z.string(),
  product_tags: z.array(z.string()),
  variant_variant_graphql_id: z.string(),
  variant_inventoryItem_id: z.string().nullable(),
  variant_inventoryItem_measurement_id: z.string().nullable(),
  variant_inventoryItem_measurement_weight_unit: z.string().nullable(),
  variant_inventoryItem_measurement_weight_value: z.number().nullable(),
  originalUnitPriceSet_shopMoney_amount: z.number(),
  discountedTotalSet_shopMoney_amount: z.number(),
})

const schema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      cancelledAt: z.string().nullable(),
      createdAt: z.string(),
      email: z.string().nullable(),
      totalPriceSet: z.object({
        shopMoney: z.object({
          amount: z.coerce.number(),
        }),
      }),
      totalShippingPriceSet: z.object({
        shopMoney: z.object({
          amount: z.coerce.number(),
        }),
      }),
      lineItems: z.object({
        nodes: z.array(orderLineItem),
      }),
    }),
  ),
})

export const orderFlatSchema = z.object({
  id: z.string(),
  cancelledAt: z.string().nullable(),
  createdAt: z.string(),
  email: z.string().nullable(),
  totalPriceSet_shopMoney_amount: z.number(),
  totalShippingPriceSet_shopMoney_amount: z.number(),
  lineItems_nodes: z.array(orderLineItemFlatSchema),
})

const query = `#graphql
  query GetOrdersWithLineItems ($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Order {
        id
        cancelledAt
        createdAt
        email
        totalPriceSet {
          shopMoney {
            amount
          }
        }
        totalShippingPriceSet {
          shopMoney {
            amount
          }
        }
        lineItems(first: 250) {
          nodes {
            line_item_id: id
            quantity
            title
            product {
              tags
            }
            variant {
              variant_graphql_id: id
              inventoryItem {
                id
                measurement {
                  id
                  weight {
                    unit
                    value
                  }
                }
              }
            }
            originalUnitPriceSet {
              shopMoney {
                amount
              }
            }
            discountedTotalSet {
              shopMoney {
                amount
              }
            }
          }
        }
      }
    }
  }
`

const shopifyGetOrdersWithLineItems = async (graphqlOrderIds: string[]) => {
  const cleanedIds = graphqlOrderIds
    .map((id) => id.replace('gid://shopify/Order/', ''))
    .map((id) => z.coerce.bigint().safeParse(id)?.data)
    .map((id) => `gid://shopify/Order/${id}`)
  if (cleanedIds.length === 0) {
    return []
  }
  console.info(`Getting ${cleanedIds.length} orders with line items from Shopify`)
  const response = await shopify.graphql(query, { ids: cleanedIds })
  const nodes = schema.parse(response).nodes
  console.info(`Got ${nodes.length} orders with line items from Shopify`)
  // sort nodes by node.createdAt
  nodes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const flatOrders = nodes.map((node) => {
    const lineItems = node.lineItems.nodes.map((lineItem) => ({
      ...lineItem,
      product_tags: lineItem.product.tags,
      variant_variant_graphql_id: lineItem.variant.variant_graphql_id,
      variant_inventoryItem_id: lineItem.variant.inventoryItem?.id,
      variant_inventoryItem_measurement_id: lineItem.variant.inventoryItem?.measurement.id,
      variant_inventoryItem_measurement_weight_unit: lineItem.variant.inventoryItem?.measurement.weight.unit,
      variant_inventoryItem_measurement_weight_value: lineItem.variant.inventoryItem?.measurement.weight.value,
      originalUnitPriceSet_shopMoney_amount: lineItem.originalUnitPriceSet.shopMoney.amount,
      discountedTotalSet_shopMoney_amount: lineItem.discountedTotalSet.shopMoney.amount,
    }))

    const flatOrder = orderFlatSchema.parse({
      ...node,
      lineItems_nodes: lineItems,
      totalPriceSet_shopMoney_amount: node.totalPriceSet.shopMoney.amount,
      totalShippingPriceSet_shopMoney_amount: node.totalShippingPriceSet.shopMoney.amount,
    })
    return flatOrder
  })
  return flatOrders
}

export default cache(shopifyGetOrdersWithLineItems)
