import { SkuQty, V3Offer } from '@/app/api/manifest/models'
import { post } from '@/lib/fetchWrapper'

async function clientPutSkuQtyRequest(offerV3ID: number, skuQty: SkuQty) {
  const formattedSkuToAdd: SkuQty[] = [skuQty]
  const response: V3Offer = await post('/api/manifest/', {
    action: 'put_sku_to_offer',
    offer_id: offerV3ID,
    sku_to_add: formattedSkuToAdd,
  })
  return response
}

export default clientPutSkuQtyRequest
