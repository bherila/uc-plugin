import 'server-only'
import shopify from '@/server_lib/shopify'

const GRAPHQL = `mutation changeLineItemQuantity(
  $orderId: ID!
  $lineItemId: ID!
  $quantity: Int!) {
  orderEditSetQuantity(id: $orderId, lineItemId: $lineItemId, quantity: $quantity) {
    calculatedOrder {
      id
      addedLineItems(first: 5) {
        edges {
          node {
            id
            quantity
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`

// Ref: https://community.shopify.com/c/customers-discounts-and-orders/remove-lineitem-form-order-via-api-rest-graphql/m-p/1338407

export async function shopifySetLineItemQuantity(
  // this is from orderEditBegin
  calculated_order_id: string,
  calculated_lineitem_id: string,
  quantity: number,
): Promise<{
  calculated_lineitem_id: string
}> {
  // validate the variant id is in the shopify uri format
  if (!calculated_order_id.startsWith('gid://shopify/CalculatedOrder/')) {
    throw new Error('Invalid calculated order id')
  }
  if (!calculated_lineitem_id.startsWith('gid://shopify/CalculatedLineItem/')) {
    throw new Error('Invalid calculated line item id: "' + calculated_lineitem_id + '"')
  }
  try {
    const data = await shopify.graphql(GRAPHQL, {
      orderId: calculated_order_id,
      lineItemId: calculated_lineitem_id,
      quantity: quantity,
    })
    return { calculated_lineitem_id }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function shopifyRemoveLineItem(calculated_order_id: string, calculated_lineitem_id: string) {
  return await shopifySetLineItemQuantity(calculated_order_id, calculated_lineitem_id, 0)
}
