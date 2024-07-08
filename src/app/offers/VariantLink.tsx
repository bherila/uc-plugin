import { ShopifyProductVariant } from '@/app/api/shopify/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons/faExternalLink'
import React from 'react'
function VariantLink({
  shopifyData,
  variantURI,
}: {
  shopifyData: ShopifyProductVariant[] | null
  variantURI: string
}) {
  try {
    const variantNum = variantURI.split('/').pop()
    const shopifyProduct = shopifyData?.find((x) => x.variantId == variantURI)
    const productId = shopifyProduct?.productId.split('/').pop()
    return (
      <a
        target="_blank"
        href={`https://admin.shopify.com/store/d62c7d-0a/products/${productId}`}
      >
        {variantNum} <FontAwesomeIcon icon={faExternalLink} />
      </a>
    )
  } catch (err) {
    console.error(err)
  }
  return <span>{variantURI}</span>
}

export default VariantLink
