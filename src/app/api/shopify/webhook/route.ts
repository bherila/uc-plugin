import shopify from '@/lib/shopify'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import db from '@/lib/db'
import shopifyProcessOrder from '@/lib/shopifyProcessOrder'

// const verifyHmac = (req: NextRequest, secret: string) => {
//   const hmacHeader = req.headers.get('X-Shopify-Hmac-SHA256');
//   const hash = crypto.createHmac('sha256', secret);
//   if (req.body != null) {
//     hash.update(req.body);
//   }
//   const computedHmac = hash.digest('base64');
//   return crypto.timingSafeEqual(Buffer.from(hmacHeader), Buffer.from(computedHmac));
// };

const webhookSchema = z.object({
  // i.e. "admin_graphql_api_id": "gid://shopify/Order/820982911946154508",
  admin_graphql_api_id: z.string(),
})

async function log(msg: any) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query('insert into v3_audit_log (event_name, event_ext) values (?, ?)', ['webhook', txt])
}

export async function POST(req: NextRequest) {
  // const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  // if (!verifyHmac(req, secret)) {
  //   return new Response(null, { status: 401 });
  // }

  // https://shopify.dev/docs/api/webhooks?reference=toml#list-of-topics-orders/paid
  const webhookData = await req.json()
  try {
    await log(webhookData)
    const parsedOrder = webhookSchema.parse(webhookData)
    await shopifyProcessOrder(parsedOrder.admin_graphql_api_id)
  } catch (error) {
    await log((error instanceof Error ? error.message : error?.toString()) ?? 'null')
    return NextResponse.json(null, { status: 400 })
  } finally {
    await db.end()
  }
  return NextResponse.json(null, { status: 200 })
}
