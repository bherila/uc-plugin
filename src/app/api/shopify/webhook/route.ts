import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import db from '@/lib/db'
import shopifyProcessOrder from '@/lib/shopifyProcessOrder'

export const maxDuration = 60

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

async function log(msg: any, order_id: bigint | null = null) {
  const txt = typeof msg === 'string' ? msg : JSON.stringify(msg)
  await db.query('insert into v3_audit_log (event_name, event_ext, order_id) values (?, ?, ?)', [
    'webhook',
    txt,
    order_id?.toString(),
  ])
}

export async function POST(req: NextRequest) {
  // const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  // if (!verifyHmac(req, secret)) {
  //   return new Response(null, { status: 401 });
  // }

  // https://shopify.dev/docs/api/webhooks?reference=toml#list-of-topics-orders/paid
  const webhookData = await req.json()
  let parsedOrderIdBigint: bigint | null = null
  try {
    const parsedOrder = webhookSchema.parse(webhookData)
    parsedOrderIdBigint =
      z.coerce.bigint().safeParse(parsedOrder.admin_graphql_api_id?.replace('gid://shopify/Order/', '')).data ??
      null
    await log('About to process webhook: ' + JSON.stringify(webhookData), parsedOrderIdBigint)
    await shopifyProcessOrder(parsedOrder.admin_graphql_api_id)
  } catch (error) {
    await log('Error parsing webhook data: ' + JSON.stringify(webhookData), parsedOrderIdBigint)
    await log((error instanceof Error ? error.message : error?.toString()) ?? 'null', parsedOrderIdBigint)
    return NextResponse.json(null, { status: 400 })
  } finally {
    await db.end()
  }
  return NextResponse.json(null, { status: 200 })
}
