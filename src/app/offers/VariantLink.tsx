import { faExternalLink } from '@fortawesome/free-solid-svg-icons/faExternalLink'
import React from 'react'
import svrLoadShopifyProducts, {
  MID,
} from '@/server_lib/svrLoadShopifyProducts'
import FontAwesomeIcon from '@/lib/FontAwesomeIcon'
export default async function VariantLink({
  variantURI,
  type,
}: {
  variantURI: string
  type: MID
}) {
  try {
    const shopifyData = await svrLoadShopifyProducts(type)
    const variantNum = variantURI.split('/').pop()
    const shopifyProduct = shopifyData?.find((x) => x.variantId == variantURI)
    const productId = shopifyProduct?.productId.split('/').pop()
    return (
      <a
        target="_blank"
        href={`https://admin.shopify.com/store/d62c7d-0a/products/${productId}`}
      >
        {variantNum}&nbsp;
        <FontAwesomeIcon icon={faExternalLink} />
      </a>
    )
  } catch (err) {
    console.error(err)
  }
  return <span>{variantURI}</span>
}
