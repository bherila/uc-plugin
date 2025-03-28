export interface ShopifyProductVariant {
  productId: string
  productName: string
  variantName: string
  variantId: string
  variantPrice?: string
  variantCompareAtPrice?: string
  variantInventoryQuantity: number
  variantSku: string
  variantWeight?: string
}
