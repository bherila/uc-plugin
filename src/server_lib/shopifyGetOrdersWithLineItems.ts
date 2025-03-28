import 'server-only'
import { z } from 'zod'
import shopify from '@/server_lib/shopify'
import { cache } from 'react'

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
        nodes: z.array(
          z.object({
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
          }),
        ),
      }),
    }),
  ),
})

const query = `
  query ($ids: [ID!]!) {
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
  const response = await shopify.graphql(query, { ids: cleanedIds })
  const nodes = schema.parse(response).nodes
  // sort nodes by node.createdAt
  nodes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  return nodes
}

export default cache(shopifyGetOrdersWithLineItems)
