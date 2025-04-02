import 'server-only'
import shopify from '@/server_lib/shopify'
import currency from 'currency.js'

const GQL_BEGIN_EDIT = `#graphql
mutation beginEdit($order_id: ID!) {
  orderEditBegin(id: $order_id) {
    calculatedOrder {
      id
      lineItems(first: 250) {
        nodes {
          id
          variant {
            id
            product {
              tags
            }
          }
          quantity
        }
      }
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
  }
}`

type BeginEditInput = {
  orderId: string
}

export async function shopifyBeginOrderEdit({ orderId }: BeginEditInput): Promise<{
  calculatedOrderId: string
  totalPrice: currency
  editableLineItems: {
    calculatedLineItemId: string
    variantId: string
    quantity: number
    productTags: string[]
  }[]
}> {
  const response = await shopify.graphql(GQL_BEGIN_EDIT, { order_id: orderId })

  const editableLineItems = []
  for (const item of response.orderEditBegin?.calculatedOrder?.lineItems?.nodes ?? []) {
    if (item.variant) {
      editableLineItems.push({
        calculatedLineItemId: item.id,
        variantId: item.variant.id,
        quantity: item.quantity,
        productTags: item.variant.product.tags ?? [],
      })
    }
  }

  return {
    calculatedOrderId: response.orderEditBegin?.calculatedOrder?.id ?? '',
    totalPrice: currency(response.orderEditBegin?.calculatedOrder?.totalPriceSet?.shopMoney?.amount ?? 0),
    editableLineItems,
  }
}
