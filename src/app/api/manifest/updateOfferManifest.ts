import {
  SkuQty,
  V3Manifest,
  V3ManifestForInsert,
  V3Offer,
} from '@/app/api/manifest/models'
import db from '@/lib/db'
import queryOffer from '@/app/api/manifest/queryOffer'
import groupBySku from '@/lib/groupBySku'

function deltaManifestForOffer(
  currentManifests: V3Manifest[],
  skuQtyToSet: SkuQty[],
) {
  let toDelete: V3Manifest[] = []
  let toInsert: V3ManifestForInsert[] = []
  console.info(
    `Generating delta for ${currentManifests.length} current manifests`,
  )
  const groups = groupBySku(currentManifests)
  for (let skuQty of skuQtyToSet) {
    const { variant_id: key, qty } = skuQty
    const oldQty = groups[key]?.length ?? 0
    console.info(`Setting skuQty for sku=${key}, qty=${qty}, oldQty=${oldQty}`)
    if (!!groups[key] && Array.isArray(groups[key]) && oldQty > qty) {
      // delete
      const numToDel = oldQty - qty
      toDelete = [...toDelete, ...groups[key].slice(0, numToDel)]
    }
    if (oldQty < qty) {
      // add
      const numToAdd = qty - oldQty
      for (let i = 0; i < numToAdd; ++i) {
        toInsert.push({
          variant_id: key,
        })
      }
    }
  }
  console.info({ toDelete, toInsert })
  return { toDelete, toInsert }
}

export default async function updateOfferManifests(
  offer_id: number,
  skuQtyToSet: SkuQty[],
): Promise<V3Offer | null> {
  try {
    const before = await queryOffer({ offer_id })
    if (before == null) {
      return null
    }

    // generate delta for insert/delete
    const { toDelete, toInsert } = deltaManifestForOffer(before.mf, skuQtyToSet)

    // process deletes, not deleting any manifest that is already assigned
    if (toDelete.length > 0) {
      await db.query(
        'delete from v3_offer_manifest where assignee_id is null and m_id in (?)',
        [toDelete.map((r) => r.id)],
      )
    }

    // process inserts
    if (toInsert.length > 0) {
      await db.query(
        'insert into v3_offer_manifest (offer_id, mf_variant, assignment_ordering) values ?',
        [toInsert.map((r) => [offer_id, r.variant_id, Math.random()])],
      )
    }
    return await queryOffer({ offer_id })
  } finally {
    await db.end()
  }
}
