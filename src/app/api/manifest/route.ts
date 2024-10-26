import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import queryOffer from '@/app/api/manifest/queryOffer'
import { z } from 'zod'
import { getSession } from '@/lib/session'
import { shopifyGetProductDataByVariantId } from '@/lib/shopifyGetProductData'
import svrLoadOfferList from '@/server_lib/svrLoadOfferList'
import svrDeleteOffer from '@/server_lib/svrDeleteOffer'
import svrCreateOffer from '@/server_lib/svrCreateOffer'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return NextResponse.json(null, { status: 403 })
  }

  const o = await req.json()

  // OFFER crud (basic SQL-only actions)
  if (['offer_create', 'offer_list', 'offer_delete'].indexOf(o.action) >= 0) {
    try {
      const { offerListItems, offerProductData } = await svrLoadOfferList()
      switch (o.action) {
        case 'offer_create':
          const parsed = z
            .object({
              offer_name: z.string(),
              offer_variant_id: z.string(),
            })
            .parse(o)
          await svrCreateOffer(parsed)
          offerListItems.push({
            offer_id: 0,
            offer_name: parsed.offer_name,
            offerProductData: {
              ...(offerProductData[parsed.offer_variant_id] ??
                (await shopifyGetProductDataByVariantId(parsed.offer_variant_id))),
              variantId: parsed.offer_variant_id,
            },
          })
          return NextResponse.json(offerListItems)

        case 'offer_delete':
          try {
            await svrDeleteOffer(o.offer_id)
            return NextResponse.json(offerListItems.filter((ol) => ol.offer_id != o.offer_id))
          } catch (err: unknown) {
            return NextResponse.json(offerListItems, {
              status: 400,
              statusText: (err as Error).message ?? (err as any).toString(),
            })
          }
      }

      // now return the list
      return NextResponse.json(offerListItems)
    } catch (err) {
      return NextResponse.json(err, { status: 400 })
    } finally {
      await db.end()
    }
  }

  return NextResponse.json(queryOffer({ offer_name: o.name }))
}
