import 'server-only'
import { V3Offer } from '@/app/api/manifest/models'
import shopifyWriteProductMetafield from '@/lib/shopifyWriteProductMetafield'
import currency from 'currency.js'

export interface ShopifyOfferMetafields {
  offerV3: string
  offerV3Array: string
}

export default async function maybeUpdateOfferMetafield(
  updatedOffer: V3Offer | null,
): Promise<ShopifyOfferMetafields | null> {
  if (updatedOffer == null) {
    return null
  }

  const data = {
    offerV3: JSON.stringify(updatedOffer.manifestProductData, null, 2),
    offerV3Array: JSON.stringify({
      items: Object.values(updatedOffer.manifestProductData).sort(
        (a, b) =>
          currency(a.maxVariantPriceAmount).subtract(
            currency(b.maxVariantPriceAmount),
          ).intValue,
      ),
      maxPrice:
        Object.values(updatedOffer.manifestProductData).reduce(
          (prev, cur) =>
            Math.max(prev, currency(cur.maxVariantPriceAmount).value),
          0,
        ) || null,
    }),
  }

  const m1 = shopifyWriteProductMetafield(
    updatedOffer.offerProductData.productId,
    'offer_v3',
    data.offerV3,
  )

  const m2 = shopifyWriteProductMetafield(
    updatedOffer.offerProductData.productId,
    'offer_v3_array',
    data.offerV3Array,
  )

  await Promise.allSettled([m1, m2])
  return data
}
