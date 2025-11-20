import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import db from '@/server_lib/db'
import shopifyProcessOrder from '@/server_lib/shopifyProcessOrder'

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
  admin_graphql_api_id: z.string().optional(),
  id: z.number().optional(),
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
  let adminGraphqlApiId: string | null = null

  try {
    if (webhookData.order_edit) {
      // Handle order_edit webhook
      const orderEditSchema = z.object({
        order_edit: z.object({
          order_id: z.number(),
        }),
      })
      const parsedOrderEdit = orderEditSchema.parse(webhookData)
      parsedOrderIdBigint = z.coerce.bigint().safeParse(parsedOrderEdit.order_edit.order_id).data ?? null
      adminGraphqlApiId = `gid://shopify/Order/${parsedOrderEdit.order_edit.order_id}`
    } else {
      // Handle other webhooks (e.g., orders/paid, orders/cancelled, products/create)
      const genericWebhookSchema = z.object({
        admin_graphql_api_id: z.string().optional(),
        id: z.number().optional(),
      })
      const parsedGenericWebhook = genericWebhookSchema.parse(webhookData)
      adminGraphqlApiId = parsedGenericWebhook.admin_graphql_api_id ?? null
      if (!adminGraphqlApiId && parsedGenericWebhook.id) {
        adminGraphqlApiId = `gid://shopify/Order/${parsedGenericWebhook.id}`
      }
      if (adminGraphqlApiId) {
        parsedOrderIdBigint =
          z.coerce.bigint().safeParse(adminGraphqlApiId.replace('gid://shopify/Order/', '')).data ?? null
      }
    }

    if (!adminGraphqlApiId) {
      throw new Error('Could not determine admin_graphql_api_id from webhook data')
    }

    await log('About to process webhook: ' + JSON.stringify(webhookData), parsedOrderIdBigint)
    await shopifyProcessOrder(adminGraphqlApiId)
  } catch (error) {
    await log('Error parsing webhook data: ' + JSON.stringify(webhookData), parsedOrderIdBigint)
    await log((error instanceof Error ? error.message : error?.toString()) ?? 'null', parsedOrderIdBigint)
    return NextResponse.json(null, { status: 400 })
  } finally {
    await db.end()
  }
  return NextResponse.json(null, { status: 200 })
}
