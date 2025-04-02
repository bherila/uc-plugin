import { z } from 'zod'
import shopify from './shopify'

const GQL_ORDER_EDIT_COMMIT = `#graphql
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

export async function orderEditCommit({
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
