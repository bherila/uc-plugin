import 'server-only'
import { V3Offer } from '@/app/api/manifest/models'
import shopifyWriteProductMetafield from '@/lib/shopifyWriteProductMetafield'
import currency from 'currency.js'

export default function maybeUpdateOfferMetafield(
  updatedOffer: V3Offer | null,
): Promise<any> {
  if (updatedOffer == null) {
    return Promise.resolve()
  }
  const m1 = shopifyWriteProductMetafield(
    updatedOffer.offerProductData.productId,
    'offer_v3',
    JSON.stringify(updatedOffer.manifestProductData, null, 2),
  )
  const m2 = shopifyWriteProductMetafield(
    updatedOffer.offerProductData.productId,
    'offer_v3_array',
    JSON.stringify({
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
  )

  return Promise.allSettled([m1, m2])
}
