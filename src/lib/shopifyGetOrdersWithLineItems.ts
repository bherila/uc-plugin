import { z } from 'zod'
import shopify from '@/lib/shopify'

const schema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      cancelledAt: z.string().nullable(),
      lineItems: z.object({
        nodes: z.array(
          z.object({
            line_item_id: z.string(),
            quantity: z.number(),
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
        lineItems(first: 250) {
          nodes {
            line_item_id: id
            quantity
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
  return schema.parse(response).nodes
}

export default shopifyGetOrdersWithLineItems
