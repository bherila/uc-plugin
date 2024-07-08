import { V3Manifest } from '@/app/api/manifest/models'
import SkuManifestGrouping from '@/lib/SkuManifestGrouping'

export default function groupBySku(
  manifests: V3Manifest[],
): SkuManifestGrouping {
  return manifests.reduce((acc: SkuManifestGrouping, manifest: V3Manifest) => {
    const sku = manifest.variant_id
    if (!acc[sku]) {
      acc[sku] = []
    }
    acc[sku].push(manifest)
    return acc
  }, {})
}
