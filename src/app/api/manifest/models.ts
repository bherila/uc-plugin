export interface ProductData {
  variantId: string
  productId: string
  title: string
  maxVariantPriceAmount: string
  featuredImageUrl: string | null
  startDate: string | null
  endDate: string | null
  status: string
  tags: string[]
  unitCost?: {
    amount: string
    currencyCode: string
  }
  variantInventoryQuantity: number
  weight: number | null
}

export interface ProductDataGrouping {
  productId: string
  title: string
  maxVariantPriceAmount: string
  featuredImageUrl: string | null
  variantInventoryQuantity: number
  qty: number
  percentChance: number
  weight: number | null
  unitCost?: {
    amount: string
    currencyCode: string
  }
}

export interface V3OfferListItem {
  offer_id: number
  offer_name: string
  offerProductData: ProductData
}

export interface V3Offer extends V3OfferListItem {
  mf: V3Manifest[]
  manifestProductData: { [key: string]: ProductDataGrouping }
  offerProductData: ProductData
}

export interface SkuQty {
  variant_id: string
  qty: number
}

export interface V3Manifest {
  id: string
  variant_id: string
  assignee_id: string | null
  assignment_ordering: number
}

export interface V3ManifestForInsert {
  variant_id: string
}
