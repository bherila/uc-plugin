import 'server-only'
import z from 'zod'
import { prisma } from '@/server_lib/prisma'
import shopify from '@/server_lib/shopify'

const QUERY = `#graphql
query GenShopifyDetail ($id: ID!) {
  node(id: $id) {
    ... on ProductVariant {
      availableToSell
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
  availableToSell: z.coerce.number().int(),
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

async function logError(err: any, offerId?: number) {
  const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
  await prisma.v3_audit_log.create({
    data: {
      event_name: 'genShopifyDetail',
      event_ext: errorMessage,
      offer_id: offerId,
    },
  })
}

export default async function genShopifyDetail(offerId: number): Promise<ShopifyDetail> {
  try {
    // get the offer variant name
    const offer = await prisma.v3_offer.findUnique({
      where: { offer_id: offerId },
      select: { offer_variant_id: true },
    })

    if (!offer) {
      throw new Error(`No offer found with ID ${offerId}`)
    }

    const offerVariant = z.string().parse(offer.offer_variant_id)

    // get the product quantity
    const gqlRoot: any = await shopify.graphql(QUERY, { id: offerVariant })
    return schema.parse(gqlRoot?.node)
  } catch (error) {
    await logError(error, offerId)
    console.error('Error in genShopifyDetail:', error)
    throw error
  }
}
