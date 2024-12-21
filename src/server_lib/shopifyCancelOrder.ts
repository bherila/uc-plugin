import 'server-only'
import shopify from '@/server_lib/shopify'
import z from 'zod'
import db from '@/server_lib/db'

const CANCEL_ORDER_MUTATION = `
  mutation cancelOrder($id: ID!, $restockInventory: Boolean = false) {
    orderCancel(input: { id: $id, restockInventory: $restockInventory }) {
      order {
        id
        cancelledAt
      }
      userErrors {
        field
        message
      }
    }
  }
`

const REFUND_ORDER_MUTATION = `
  mutation refundOrder($id: ID!) {
    refundCreate(input: {
      orderId: $id,
      shipping: { fullRefund: true },
      refundLineItems: { restockType: NO_RESTOCK }
    }) {
      refund {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query('insert into v3_audit_log (event_name, event_ext) values (?, ?)', ['cancelOrder', txt])
}

const cancelResponseSchema = z.object({
  orderCancel: z.object({
    order: z
      .object({
        id: z.string(),
        cancelledAt: z.string(),
      })
      .nullable(),
    userErrors: z.array(
      z.object({
        field: z.array(z.string()),
        message: z.string(),
      }),
    ),
  }),
})

const refundResponseSchema = z.object({
  refundCreate: z.object({
    refund: z
      .object({
        id: z.string(),
      })
      .nullable(),
    userErrors: z.array(
      z.object({
        field: z.array(z.string()),
        message: z.string(),
      }),
    ),
  }),
})

export async function shopifyCancelOrder(orderId: string, restockInventory: boolean = false) {
  try {
    await log({ orderId, restockInventory })

    const cancelResponse = await shopify.graphql(CANCEL_ORDER_MUTATION, {
      id: orderId,
      restockInventory,
    })
    const cancelResult = cancelResponseSchema.parse(cancelResponse)
    await log(cancelResult)

    const refundResponse = await shopify.graphql(REFUND_ORDER_MUTATION, {
      id: orderId,
    })
    const refundResult = refundResponseSchema.parse(refundResponse)
    await log(refundResult)

    return { cancelResult, refundResult }
  } catch (error) {
    await log(error)
    throw error
  }
}
