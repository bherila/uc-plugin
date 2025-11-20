import { z } from 'zod'
import shopify from './shopify'
import { MoneyInput } from '../../types/admin.types'

const GQL_ORDER_EDIT_ADD_SHIPPING_LINE = `#graphql
mutation orderEditAddShippingLine($id: ID!, $shippingLine: OrderEditAddShippingLineInput!) {
  orderEditAddShippingLine(id: $id, shippingLine: $shippingLine) {
    calculatedOrder {
      id
    }
    userErrors {
      field
      message
    }
  }
}`

const addShippingLineSchema = z.object({
  orderEditAddShippingLine: z.object({
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

export type AddShippingLineInput = {
  id: string
  shippingLine: {
    price: MoneyInput
    title: string
    code?: string | null
  }
}

type AddShippingLineResponse = z.infer<typeof addShippingLineSchema>

export async function shopifyOrderEditAddShippingLine(
  input: AddShippingLineInput,
): Promise<AddShippingLineResponse> {
  const response = await shopify.graphql(GQL_ORDER_EDIT_ADD_SHIPPING_LINE, input)
  const res = addShippingLineSchema.safeParse(response)
  if (res.success) {
    return res.data
  }
  console.error('addShippingLine response', JSON.stringify(response))
  throw res.error
}
