import React from 'react'
import svrLoadShopifyProducts, { MID } from '@/server_lib/svrLoadShopifyProducts'
import Badge from 'react-bootstrap/esm/Badge'
import { ShopifyProductVariant } from '@/app/api/shopify/models'

export default async function VariantLink({
  variantURI,
  type,
  shopifyData,
}: {
  variantURI: string
  type: MID
  shopifyData?: ShopifyProductVariant[]
}) {
  try {
    // If shopifyData is not provided, fetch it
    const data = shopifyData ?? (await svrLoadShopifyProducts(type))

    const shopifyProduct = data?.find((x) => x.variantId == variantURI)
    const productId = shopifyProduct?.productId.split('/').pop()
    const adminURI = `https://admin.shopify.com/store/d62c7d-0a/products/${productId}`

    if (!shopifyProduct) {
      return (
        <a target="_blank" href={adminURI}>
          <Badge bg="danger">
            SKU not found with tag {type} and id {variantURI}
          </Badge>
        </a>
      )
    }

    return (
      <a target="_blank" href={adminURI}>
        {shopifyProduct?.variantSku}
        ↗️
      </a>
    )
  } catch (err) {
    console.error(err)
    return <span>{variantURI}</span>
  }
}
