import AuthRoutes from '@/app/auth/AuthRoutes'
import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import NewOfferForm from '@/app/offers/new/NewOfferForm'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import svrCreateOffer from '@/server_lib/svrCreateOffer'
import svrLoadOfferList from '@/server_lib/svrLoadOfferList'
import { redirect, RedirectType } from 'next/navigation'
import { getSession } from '@/server_lib/session'

export default async function NewOfferPage() {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }
  const { offerListItems } = await svrLoadOfferList()
  const shopifyProducts = await svrLoadShopifyProducts('deal')

  const existingOfferVariantIds = offerListItems.map((offer) => offer.offerProductData.variantId)

  const createOffer = async (offer_name: string, offer_variant_id: string, offer_product_name: string) => {
    'use server'
    await svrCreateOffer({ offer_name, offer_variant_id, offer_product_name })
    redirect('/offers')
  }

  return (
    <Container>
      <MainTitle>Create New Offer</MainTitle>
      <NewOfferForm
        action={createOffer}
        options={shopifyProducts}
        existingOfferVariantIds={existingOfferVariantIds}
      />
    </Container>
  )
}
