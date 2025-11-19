import 'server-only'
import shopify from '@/server_lib/shopify'

const GQL_SET_SHIPPING_LINES = `#graphql
mutation setShippingLines($id: ID!, $shippingLines: [ShippingLineInput!]!) {
  orderEditSetShippingLines(id: $id, shippingLines: $shippingLines) {
    calculatedOrder {
      id
    }
    userErrors {
      field
      message
    }
  }
}`

type ShippingLineInput = {
  price: {
    amount: number
    currencyCode: string
  }
  title: string
  carrierServiceId?: string
}

type SetShippingLinesInput = {
  calculatedOrderId: string
  shippingLines: ShippingLineInput[]
}

export async function shopifySetShippingLines({ calculatedOrderId, shippingLines }: SetShippingLinesInput) {
  const response = await shopify.graphql(GQL_SET_SHIPPING_LINES, {
    id: calculatedOrderId,
    shippingLines,
  })

  if (response.orderEditSetShippingLines?.userErrors?.length > 0) {
    throw new Error(
      `Failed to set shipping lines: ${response.orderEditSetShippingLines.userErrors.map((e: any) => e.message).join(', ')}`
    )
  }

  return response.orderEditSetShippingLines?.calculatedOrder?.id
}