import 'server-only'
import { prisma } from '@/server_lib/prisma'

export default async function svrCreateOffer(parsed: {
  offer_name: string
  offer_variant_id: string
  offer_product_name: string
}) {
  try {
    // Check if an offer with the same variant ID already exists
    const existingOffer = await prisma.v3_offer.findUnique({
      where: { offer_variant_id: parsed.offer_variant_id },
    })

    if (existingOffer) {
      throw new Error(`An offer for this variant (${parsed.offer_variant_id}) already exists`)
    }

    // Insert the new offer
    await prisma.v3_offer.create({
      data: {
        offer_name: parsed.offer_name,
        offer_variant_id: parsed.offer_variant_id,
        offer_product_name: parsed.offer_product_name,
      },
    })
  } catch (error) {
    // Rethrow the error with a more informative message
    throw new Error(error instanceof Error ? error.message : `Failed to create offer: ${JSON.stringify(error)}`)
  }
}
