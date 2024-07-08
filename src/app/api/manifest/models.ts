export interface V3OfferListItem {
  offer_id: number
  offer_name: string
  offer_variant_id: string
}

export interface V3Offer extends V3OfferListItem {
  mf: V3Manifest[]
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
