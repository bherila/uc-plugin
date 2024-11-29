import 'server-only'
import { V3OfferListItem } from '@/app/api/manifest/models'
import db from '@/server_lib/db'
import { shopifyGetProductDataByVariantIds } from '@/server_lib/shopifyGetProductData'
import { cache } from 'react'

const svrLoadOfferList = cache(async () => {
  const SELECT = 'select offer_id, offer_name, offer_variant_id from v3_offer order by offer_id desc'
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

  return { offerListItems, offerProductData }
})

export default svrLoadOfferList
