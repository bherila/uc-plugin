import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import updateOfferManifests from '@/app/api/manifest/updateOfferManifest'
import queryOffer from '@/app/api/manifest/queryOffer'
import { z } from 'zod'
import { V3OfferListItem } from '@/app/api/manifest/models'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return NextResponse.json(null, { status: 403 })
  }

  const o = await req.json()

  // OFFER crud (basic SQL-only actions)
  if (['offer_create', 'offer_list', 'offer_delete'].indexOf(o.action) >= 0) {
    try {
      const SELECT =
        'select offer_id, offer_name, offer_variant_id from v3_offer order by offer_id desc'

      const existingOfferList: V3OfferListItem[] = await db.query(SELECT)

      switch (o.action) {
        case 'offer_create':
          const parsed = z
            .object({
              offer_name: z.string(),
              offer_variant_id: z.string(),
            })
            .parse(o)
          await db.query(
            'insert into v3_offer (offer_name, offer_variant_id) values (?, ?)',
            [parsed.offer_name, parsed.offer_variant_id],
          )
          existingOfferList.push({
            offer_id: 0,
            offer_name: o.name,
            offer_variant_id: parsed.offer_variant_id,
          })
          return NextResponse.json(existingOfferList)

        case 'offer_delete':
          await db.query(
            'delete from v3_offer_manifest where assignee_id is null and offer_id = ?',
            [o.offer_id],
          )
          await db.query('delete from v3_offer where offer_id = ?', [
            o.offer_id,
          ])
      }

      // now return the list
      return NextResponse.json(await db.query(SELECT))
    } catch (err) {
      return NextResponse.json(err, { status: 400 })
    } finally {
      await db.end()
    }
  }

  if (o.action === 'offer_get') {
    const params = z.object({ offer_id: z.coerce.number() }).parse(o)
    const offer = await queryOffer(params)
    return NextResponse.json(offer)
  }

  // More involved actions, these already wrap DB so don't put in the list above
  if (o.action === 'put_sku_to_offer') {
    return NextResponse.json(
      await updateOfferManifests(o.offer_id, o.sku_to_add),
    )
  }

  if (o.action === 'shopify_webhook') {
  }

  return NextResponse.json(queryOffer({ offer_name: o.name }))
}
