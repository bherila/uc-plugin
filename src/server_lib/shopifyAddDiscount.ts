import { z } from "zod"
import shopify from "./shopify"

const GQL_ADD_DISCOUNT = `#graphql
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

export async function addDiscount({
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
