import 'server-only'
import shopify from '@/server_lib/shopify'
import z from 'zod'
import { prisma } from '@/server_lib/prisma'

const CANCEL_ORDER_MUTATION = `#graphql
  mutation cancelOrder($id: ID!, $restockInventory: Boolean = false, $refund: Boolean = true) {
    orderCancel(
      orderId: $id,
      refund: $refund,
      restock: $restockInventory,
      reason: OTHER
    ) {
      userErrors {
        field
        message
      }
    }
  }
`

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await prisma.v3_audit_log.create({
    data: {
      event_name: 'cancelOrder',
      event_ext: txt,
    },
  })
}

const cancelResponseSchema = z.object({
  orderCancel: z.object({
    userErrors: z.array(
      z.object({
        field: z.array(z.string()),
        message: z.string(),
      }),
    ),
  }),
})

export async function shopifyCancelOrder(orderId: string, restockInventory: boolean = false) {
  // validate the orderId is in the shopify uri format
  if (!orderId.startsWith('gid://shopify/Order/')) {
    throw new Error('Invalid order id')
  }
  try {
    await log({ orderId, restockInventory })

    const cancelResponse = await shopify.graphql(CANCEL_ORDER_MUTATION, {
      id: orderId,
      restockInventory,
    })
    const cancelResult = cancelResponseSchema.parse(cancelResponse)
    await log(cancelResult)

    return { cancelResult }
  } catch (error) {
    await log(error)
    throw error
  }
}
