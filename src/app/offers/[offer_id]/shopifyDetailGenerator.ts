import z from 'zod'
import db from '@/lib/db'
import shopify from '@/lib/shopify'

const QUERY = `query ($id: ID!) {
  node(id: $id) {
    ... on ProductVariant {
      availableForSale
      inventoryQuantity
      product {
        title
      }
      inventoryItem {
        id
        measurement {
          id
          weight {
            unit
            value
          }
        }
      }
    }
  }
}`

const schema = z.object({
  availableForSale: z.coerce.number().int(),
  inventoryQuantity: z.coerce.number().int(),
  product: z
    .object({
      title: z.string().nullable(),
    })
    .nullable(),
  inventoryItem: z
    .object({
      id: z.string(),
      measurement: z
        .object({
          id: z.string(),
          weight: z
            .object({
              unit: z.string(),
              value: z.number(),
            })
            .nullable(),
        })
        .nullable(),
    })
    .nullable(),
})

export type ShopifyDetail = z.infer<typeof schema>

export default async function genShopifyDetail(offerId: number): Promise<ShopifyDetail> {
  try {
    // get the offer variant name
    const rows: any = await db.query(`select offer_variant_id from v3_offer where offer_id = ?`, [offerId])
    const offerVariant = z.string().parse(rows[0].offer_variant_id)

    // get the product quantity
    const gqlRoot: any = await shopify.graphql(QUERY, { id: offerVariant })
    return schema.parse(gqlRoot?.node)
  } finally {
    await db.end()
  }
}
