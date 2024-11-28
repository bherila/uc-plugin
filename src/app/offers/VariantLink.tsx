import React from 'react'
import svrLoadShopifyProducts, { MID } from '@/server_lib/svrLoadShopifyProducts'
export default async function VariantLink({ variantURI, type }: { variantURI: string; type: MID }) {
  try {
    const shopifyData = await svrLoadShopifyProducts(type)
    const shopifyProduct = shopifyData?.find((x) => x.variantId == variantURI)
    const productId = shopifyProduct?.productId.split('/').pop()
    return (
      <a target="_blank" href={`https://admin.shopify.com/store/d62c7d-0a/products/${productId}`}>
        {shopifyData.find((d) => d.variantId === variantURI)?.variantSku}
        ↗️
      </a>
    )
  } catch (err) {
    console.error(err)
  }
  return <span>{variantURI}</span>
}
