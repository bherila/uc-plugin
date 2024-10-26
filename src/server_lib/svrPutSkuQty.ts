import 'server-only'
import updateOfferManifests from '@/app/api/manifest/updateOfferManifest'
import maybeUpdateOfferMetafield from '@/server_lib/maybeUpdateOfferMetafield'
import { SkuQty } from '@/app/api/manifest/models'

export default async function svrPutSkuQty(offerID: number, skuQtyToSet: SkuQty[]) {
  const updatedOffer = await updateOfferManifests(offerID, skuQtyToSet)
  await maybeUpdateOfferMetafield(updatedOffer)
}
