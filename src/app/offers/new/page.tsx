import AuthRoutes from '@/app/auth/AuthRoutes'
import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import NewOfferForm from '@/app/offers/new/NewOfferForm'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import svrCreateOffer from '@/server_lib/svrCreateOffer'
import svrLoadOfferList from '@/server_lib/svrLoadOfferList'
import { redirect } from 'next/navigation'

export default async function NewOfferPage() {
  const { offerListItems } = await svrLoadOfferList()
  const shopifyProducts = await svrLoadShopifyProducts('manifest-item')

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
