import 'server-only'
import { z } from 'zod'
import shopify from './shopify'
import { prisma } from './prisma'

const GQL_ORDER_CAPTURE = `#graphql
mutation orderCapture($input: OrderCaptureInput!) {
  orderCapture(input: $input) {
    order {
      id
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
      financialStatus
    }
    userErrors {
      field
      message
    }
  }
}
`

const orderCaptureSchema = z.object({
  orderCapture: z.object({
    order: z
      .object({
        id: z.string(),
        totalPriceSet: z.object({
          shopMoney: z.object({
            amount: z.string(),
            currencyCode: z.string(),
          }),
        }),
        financialStatus: z.string(),
      })
      .nullable(),
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

export interface OrderCaptureInput {
  id: string
  parentTransactionId: string
  amount: string
}

export async function shopifyOrderCapture(input: OrderCaptureInput) {
  try {
    const response = await shopify.graphql(GQL_ORDER_CAPTURE, { input })
    const parsedResponse = orderCaptureSchema.parse(response)

    // Log the capture attempt
    await prisma.v3_audit_log.create({
      data: {
        event_name: 'shopifyOrderCapture',
        event_ext: JSON.stringify({
          orderId: input.id,
          amount: input.amount,
          financialStatus: parsedResponse.orderCapture.order?.financialStatus,
        }),
        order_id: BigInt(input.id.replace('gid://shopify/Order/', '')),
      },
    })

    return parsedResponse
  } catch (error) {
    // Log any errors during capture
    await prisma.v3_audit_log.create({
      data: {
        event_name: 'shopifyOrderCapture_ERROR',
        event_ext: JSON.stringify({
          orderId: input.id,
          amount: input.amount,
          error: error instanceof Error ? error.message : String(error),
        }),
        order_id: BigInt(input.id.replace('gid://shopify/Order/', '')),
      },
    })

    throw error
  }
}
