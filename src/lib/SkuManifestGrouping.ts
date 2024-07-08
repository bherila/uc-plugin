import { V3Manifest } from '@/app/api/manifest/models'

export default interface SkuManifestGrouping {
  [sku: string]: V3Manifest[]
}
