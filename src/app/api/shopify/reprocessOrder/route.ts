import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import shopifyProcessOrder from '@/server_lib/shopifyProcessOrder'

export async function POST(req: NextRequest) {
  // https://shopify.dev/docs/api/webhooks?reference=toml#list-of-topics-orders/paid
  const webhookData = await req.json()
  const parsedOrder = z.object({ shopifyOrderId: z.string() }).parse(webhookData)
  await shopifyProcessOrder(parsedOrder.shopifyOrderId)
  return NextResponse.json(null, { status: 200 })
}
