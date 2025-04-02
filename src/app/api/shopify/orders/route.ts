import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import shopifyGetOrdersWithLineItems from '@/server_lib/shopifyGetOrdersWithLineItems'
import { getSession } from '@/server_lib/session'

export interface OrderSummary {
  id: string
  canceledAt: string | null
  lineItemCount: number
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return NextResponse.json(null, { status: 403 })
  }

  const webhookData = await req.json()
  try {
    const input = z.object({ orderGraphqlIDs: z.array(z.string()) }).parse(webhookData)

    const result: OrderSummary[] = []
    const orders = await shopifyGetOrdersWithLineItems(input.orderGraphqlIDs)
    for (const order of orders) {
      result.push({
        id: order.id,
        canceledAt: order.cancelledAt,
        lineItemCount: order.lineItems_nodes.length,
      })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    throw error
  }
}
