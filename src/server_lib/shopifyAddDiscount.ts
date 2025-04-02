import { z } from 'zod'
import shopify from './shopify'

const GQL_ADD_DISCOUNT = `#graphql
mutation orderEditAddLineItemDiscount($discount: OrderEditAppliedDiscountInput!, $calculated_order_id: ID!, $calculated_line_item_id: ID!) {
  orderEditAddLineItemDiscount(discount: $discount, id: $calculated_order_id, lineItemId: $calculated_line_item_id) {
    addedDiscountStagedChange {
      # OrderStagedChangeAddLineItemDiscount fields
      id
      description
      value {
        __typename
      }
    }
    userErrors {
      field
      message
    }
  }
}`

interface OrderEditAppliedDiscountInput {
  percentValue?: number
  description?: string
}

type AddDiscountInput = {
  discount: OrderEditAppliedDiscountInput
  calculatedOrderId: string
  calculatedLineItemId: string
}

export async function addDiscount({
  discount,
  calculatedOrderId,
  calculatedLineItemId,
}: AddDiscountInput): Promise<any> {
  const response = await shopify.graphql(GQL_ADD_DISCOUNT, {
    discount,
    calculated_order_id: calculatedOrderId,
    calculated_line_item_id: calculatedLineItemId,
  })
  return response
}
