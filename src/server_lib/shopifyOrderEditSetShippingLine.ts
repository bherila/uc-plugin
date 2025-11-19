import { z } from 'zod'
import shopify from './shopify'

const GQL_ORDER_EDIT_SET_SHIPPING_LINE = `#graphql
mutation orderEditSetShippingLine($id: ID!, $shippingLine: OrderEditShippingLineInput!) {
  orderEditSetShippingLine(id: $id, shippingLine: $shippingLine) {
    calculatedOrder {
      id
    }
    userErrors {
      field
      message
    }
  }
}`

const setShippingLineSchema = z.object({
  orderEditSetShippingLine: z.object({
    calculatedOrder: z
      .object({
        id: z.string(),
      })
      .nullable(),
    userErrors: z.array(
      z.object({
        field: z.array(z.string()),
        message: z.string(),
      }),
    ),
  }),
})

type SetShippingLineInput = {
  id: string
  shippingLine: {
    shippingRateHandle: string
  }
}

type SetShippingLineResponse = z.infer<typeof setShippingLineSchema>

export async function shopifyOrderEditSetShippingLine(
  input: SetShippingLineInput,
): Promise<SetShippingLineResponse> {
  const response = await shopify.graphql(GQL_ORDER_EDIT_SET_SHIPPING_LINE, input)
  const res = setShippingLineSchema.safeParse(response)
  if (res.success) {
    return res.data
  }
  console.error('setShippingLine response', JSON.stringify(response))
  throw res.error
}
