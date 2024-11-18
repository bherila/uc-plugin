import { z } from 'zod'
import shopify from '@/lib/shopify'
import { create } from 'lodash'

const schema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      cancelledAt: z.string().nullable(),
      createdAt: z.string(),
      totalPriceSet: z.object({
        presentmentMoney: z.object({
          amount: z.coerce.number(),
        }),
      }),
      totalShippingPriceSet: z.object({
        presentmentMoney: z.object({
          amount: z.coerce.number(),
        }),
      }),
      lineItems: z.object({
        nodes: z.array(
          z.object({
            line_item_id: z.string(),
            quantity: z.number(),
            title: z.string(),
            variant: z.object({
              variant_graphql_id: z.string(),
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
        totalPriceSet {
          presentmentMoney {
            amount
          }
        }
        totalShippingPriceSet {
          presentmentMoney {
            amount
          }
        }
        lineItems(first: 250) {
          nodes {
            line_item_id: id
            quantity
            title
            variant {
              variant_graphql_id: id
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
  const response = await shopify.graphql(query, { ids: graphqlOrderIds })
  const nodes = schema.parse(response).nodes
  // sort nodes by node.createdAt
  nodes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  return nodes
}

export default shopifyGetOrdersWithLineItems
