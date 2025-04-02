import { z } from 'zod'
import shopify from './shopify'

const GQL_ADD_VARIANT = `#graphql
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

export async function addVariant(input: AddVariantInput): Promise<AddVariantResponse> {
  const response = await shopify.graphql(GQL_ADD_VARIANT, input)
  const res = addVariantSchema.safeParse(response)
  if (res.success) {
    return res.data
  }
  console.error('addVariant response', JSON.stringify(response))
  throw res.error
}
