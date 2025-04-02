import 'server-only'
import shopify from '@/server_lib/shopify'
import { z } from 'zod'
import currency from 'currency.js'

const GQL_BEGIN_EDIT = `#graphql
mutation beginEdit($order_id: ID!){
 orderEditBegin(id: $order_id){
    calculatedOrder{
      id
      lineItems(first: 250){
        edges {
          node {
            id
            quantity
            sku
          }
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

          lineItems: z
            .array(
              z.object({
                edges: z.array(
                  z.object({
                    node: z.object({
                      id: z.string(),
                      quantity: z.number(),
                      sku: z.string().nullable(),
                    }),
                  }),
                ),
              }),
            )
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
  mapSku2LineItemId: Map<string, string>
}> {
  const response = await shopify.graphql(GQL_BEGIN_EDIT, { order_id: orderId })
  // console.info('beginEdit response', response)
  const parsed = beginEditSchema.parse(response)
  const mapSku2LineItemId = new Map<string, string>()
  if (parsed.orderEditBegin?.calculatedOrder?.lineItems) {
    for (const lineItem of parsed.orderEditBegin?.calculatedOrder?.lineItems) {
      if (lineItem.edges) {
        for (const edge of lineItem.edges) {
          mapSku2LineItemId.set(edge.node.sku ?? '', edge.node.id)
        }
      }
    }
  }
  return {
    calculatedOrderId: parsed.orderEditBegin?.calculatedOrder?.id ?? '',
    totalPrice: currency(parsed.orderEditBegin?.calculatedOrder?.totalPriceSet?.shopMoney?.amount ?? 0),
    mapSku2LineItemId,
  }
}
