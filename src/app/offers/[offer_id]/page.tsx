import React from 'react'
import OfferPageClient from '@/app/offers/[offer_id]/OfferPageClient'
import z from 'zod'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'
import shopify from '@/lib/shopify'
import db from '@/lib/db'

export default async function Page({
  params,
}: {
  params: { offer_id: string }
}) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offerId = z.coerce.number().parse(params.offer_id)
  try {
    // get the offer variant name
    const rows: any = await db.query(
      `select offer_variant_id from v3_offer where offer_id = ?`,
      [offerId],
    )
    const offerVariant = z.string().parse(rows[0].offer_variant_id)

    // get the product quantity
    const gqlNode: any = (await shopify.graphql(QUERY, { id: offerVariant }))
      ?.node

    return (
      <OfferPageClient
        offer_id={offerId}
        shopifyTitle={gqlNode?.product?.title}
        shopifyInventoryQuantity={gqlNode?.inventoryQuantity}
        availableForSale={gqlNode?.availableForSale}
      />
    )
  } finally {
    await db.end()
  }
}

const QUERY = `query ($id: ID!) {
  node(id: $id) {
    ... on ProductVariant {
      availableForSale
      inventoryQuantity
      product {
        title
      }
    }
  }
}`
