import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import updateOfferManifests from '@/app/api/manifest/updateOfferManifest'
import queryOffer from '@/app/api/manifest/queryOffer'
import { z } from 'zod'
import { V3Offer, V3OfferListItem } from '@/app/api/manifest/models'
import { getSession } from '@/lib/session'
import {
  shopifyGetProductDataByVariantId,
  shopifyGetProductDataByVariantIds,
} from '@/lib/shopifyGetProductData'
import shopifyWriteProductMetafield from '@/lib/shopifyWriteProductMetafield'
import ShopifyWriteProductMetafield from '@/lib/shopifyWriteProductMetafield'
import currency from 'currency.js'

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
      const offerListItems: V3OfferListItem[] = []
      const raw_v3_offer_rows: {
        offer_id: number
        offer_name: string
        offer_variant_id: string
      }[] = await db.query(SELECT)

      const offerProductData = await shopifyGetProductDataByVariantIds(
        raw_v3_offer_rows.map((r) => r.offer_variant_id),
      )

      for (const offer of raw_v3_offer_rows) {
        offerListItems.push({
          offer_id: offer.offer_id,
          offer_name: offer.offer_name,
          offerProductData: {
            ...offerProductData[offer.offer_variant_id],
            variantId: offer.offer_variant_id,
          },
        })
      }

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
          offerListItems.push({
            offer_id: 0,
            offer_name: o.name,
            offerProductData: {
              ...(offerProductData[parsed.offer_variant_id] ??
                (await shopifyGetProductDataByVariantId(
                  parsed.offer_variant_id,
                ))),
              variantId: parsed.offer_variant_id,
            },
          })
          return NextResponse.json(offerListItems)

        case 'offer_delete':
          await db.query(
            'delete from v3_offer_manifest where assignee_id is null and offer_id = ?',
            [o.offer_id],
          )
          const remaining: any[] = await db.query(
            'select count(*) c from v3_offer_manifest where offer_id = ?',
            [o.offer_id],
          )
          if (remaining[0].c != 0) {
            return NextResponse.json(offerListItems, {
              status: 400,
              statusText: 'Failed to delete offer due to allocated manifests',
            })
          }
          await db.query('delete from v3_offer where offer_id = ?', [
            o.offer_id,
          ])
          return NextResponse.json(
            offerListItems.filter((ol) => ol.offer_id != o.offer_id),
          )
      }

      // now return the list
      return NextResponse.json(offerListItems)
    } catch (err) {
      return NextResponse.json(err, { status: 400 })
    } finally {
      await db.end()
    }
  }

  // these have to do with an offer_id or name

  if (o.action === 'offer_get') {
    const params = z.object({ offer_id: z.coerce.number() }).parse(o)
    const offer = await queryOffer(params)
    await maybeUpdateOfferMetafield(offer)
    return NextResponse.json(offer)
  }

  // More involved actions, these already wrap DB so don't put in the list above
  if (o.action === 'put_sku_to_offer') {
    const updatedOffer = await updateOfferManifests(o.offer_id, o.sku_to_add)
    await maybeUpdateOfferMetafield(updatedOffer)
    return NextResponse.json(updatedOffer)
  }

  if (o.action === 'shopify_webhook') {
  }

  return NextResponse.json(queryOffer({ offer_name: o.name }))
}

async function maybeUpdateOfferMetafield(updatedOffer: V3Offer | null) {
  if (updatedOffer != null) {
    await shopifyWriteProductMetafield(
      updatedOffer.offerProductData.productId,
      'offer_v3',
      JSON.stringify(updatedOffer.manifestProductData, null, 2),
    )
    await ShopifyWriteProductMetafield(
      updatedOffer.offerProductData.productId,
      'offer_v3_array',
      JSON.stringify({
        items: Object.values(updatedOffer.manifestProductData),
        maxPrice:
          Object.values(updatedOffer.manifestProductData).reduce(
            (prev, cur) =>
              Math.max(prev, currency(cur.maxVariantPriceAmount).value),
            0,
          ) || null,
      }),
    )
  }
}
