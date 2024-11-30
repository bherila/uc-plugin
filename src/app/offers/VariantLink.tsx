import React from 'react'
import svrLoadShopifyProducts, { MID } from '@/server_lib/svrLoadShopifyProducts'
import Badge from 'react-bootstrap/esm/Badge'
export default async function VariantLink({ variantURI, type }: { variantURI: string; type: MID }) {
  try {
    const shopifyData = await svrLoadShopifyProducts(type)
    const shopifyProduct = shopifyData?.find((x) => x.variantId == variantURI)
    const productId = shopifyProduct?.productId.split('/').pop()
    const sr = shopifyData.find((d) => d.variantId === variantURI)
    const adminURI = `https://admin.shopify.com/store/d62c7d-0a/products/${productId}`
    if (sr === null) {
      // return an error badge with "SKU not found with tag {type} and id {variantURI}"
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
        {sr?.variantSku}
        ↗️
      </a>
    )
  } catch (err) {
    console.error(err)
  }
  return <span>{variantURI}</span>
}
