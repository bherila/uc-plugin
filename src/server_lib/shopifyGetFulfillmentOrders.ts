import 'server-only'
import shopify from './shopify'
import z from 'zod'

const FulfillmentOrderNodeSchema = z.object({
  id: z.string(),
  status: z.string(),
  fulfillAt: z.string().nullable(),
  assignedLocation: z.object({
    location: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  deliveryMethod: z.object({
    presentedName: z.string(),
  }),
  lineItems: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        totalQuantity: z.number(),
      }),
    ),
  }),
})

const GetFulfillmentOrdersResponseSchema = z.object({
  order: z
    .object({
      fulfillmentOrders: z.object({
        nodes: z.array(FulfillmentOrderNodeSchema),
      }),
    })
    .nullable(),
})

export type FulfillmentOrder = z.infer<typeof FulfillmentOrderNodeSchema>

export async function shopifyGetFulfillmentOrders(orderId: string): Promise<FulfillmentOrder[]> {
  const query = `
    query GetFulfillmentOrders($orderId: ID!) {
      order(id: $orderId) {
        fulfillmentOrders(first: 10) {
          nodes {
            id
            status
            fulfillAt
            assignedLocation {
              location {
                id
                name
              }
            }
            deliveryMethod {
              presentedName
            }
            lineItems(first: 10) {
              nodes {
                id
                totalQuantity
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    orderId: orderId,
  }

  const response = await shopify.graphql(query, variables)

  const { order } = GetFulfillmentOrdersResponseSchema.parse(response)
  return order?.fulfillmentOrders.nodes ?? []
}
