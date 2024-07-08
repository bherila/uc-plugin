import { V3Manifest, V3Offer } from '@/app/api/manifest/models'
import db from '@/lib/db'
import z from 'zod'

interface OfferDbSchemaRow {
  offer_id: number
  offer_name: string
  offer_variant_id: string
}

export default async function queryOffer(query: {
  offer_id?: number
  offer_name?: string
}): Promise<V3Offer | null> {
  try {
    const { offer_id, offer_name } = z
      .object({
        offer_id: z.coerce.number().optional(),
        offer_name: z.string().optional(),
      })
      .parse(query)
    let offerArr: OfferDbSchemaRow[]
    if (offer_id && !offer_name) {
      offerArr = await db.query(
        `select offer_id, offer_name, offer_variant_id
         from v3_offer
         where offer_id = ?
         order by offer_id
         limit 1`,
        [offer_id],
      )
    } else if (offer_name && !offer_id) {
      offerArr = await db.query(
        `select offer_id, offer_name, offer_variant_id
         from v3_offer
         where offer_name = ?
         order by offer_id
         limit 1`,
        [offer_name],
      )
    } else {
      offerArr = await db.query(
        `select offer_id, offer_name, offer_variant_id
         from v3_offer
         where offer_id = ?
            or offer_name = ?
         order by offer_id
         limit 1`,
        [offer_id, offer_name],
      )
    }

    if (!Array.isArray(offerArr)) {
      return null // offerArr was not found
    }

    if (offerArr.length != 1) {
      return null
    }

    const offer = offerArr[0]
    const offerManifests: V3Manifest[] = await db.query(
      `
          select m_id as id, mf_variant as variant_id, assignee_id, assignment_ordering
          from v3_offer_manifest
          where offer_id = ?
          order by mf_variant`,
      [z.coerce.number().parse(offer_id)],
    )

    return {
      offer_id: z.coerce.number().parse(offer.offer_id),
      offer_variant_id: offer.offer_variant_id,
      offer_name: offer.offer_name,
      mf: offerManifests.map(
        (mf): V3Manifest => ({
          id: mf.id.toString(),
          variant_id: mf.variant_id,
          assignee_id: mf.assignee_id,
          assignment_ordering: mf.assignment_ordering,
        }),
      ),
    }
  } finally {
    await db.end()
  }
}
