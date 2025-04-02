import 'server-only'
import shopify from '@/server_lib/shopify'
import { z } from 'zod'
import currency from 'currency.js'

const GQL_BEGIN_EDIT = `#graphql
mutation beginEdit($order_id: ID!){
 orderEditBegin(id: $order_id){
    calculatedOrder{
      id
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
  }
}`

const beginEditSchema = z.object({
  orderEditBegin: z
    .object({
      calculatedOrder: z
        .object({
          id: z.string(),

          totalPriceSet: z
            .object({
              shopMoney: z
                .object({
                  amount: z.string(),
                  currencyCode: z.string(),
                })
                .nullable(),
            })
            .nullable(),
        })
        .nullable(),
    })
    .nullable(),
})

type BeginEditInput = {
  orderId: string
}

export async function shopifyBeginOrderEdit({ orderId }: BeginEditInput): Promise<{
  calculatedOrderId: string
  totalPrice: currency
}> {
  const response = await shopify.graphql(GQL_BEGIN_EDIT, { order_id: orderId })
  // console.info('beginEdit response', response)
  const parsed = beginEditSchema.parse(response)
  return {
    calculatedOrderId: parsed.orderEditBegin?.calculatedOrder?.id ?? '',
    totalPrice: currency(parsed.orderEditBegin?.calculatedOrder?.totalPriceSet?.shopMoney?.amount ?? 0),
  }
}
