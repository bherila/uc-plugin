import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import { getSession } from '@/server_lib/session'
import { redirect, RedirectType } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import z from 'zod'
import queryOffer from '@/app/api/manifest/queryOffer'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import AddManifestForm from '@/app/offers/[offer_id]/AddManifestForm'
import { addManifestAction } from '@/app/offers/[offer_id]/_addManifestServerAction'

export default async function AddManifestPage({ params }: { params: { offer_id: string } }) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offer_id = z.coerce.number().parse(params.offer_id)

  const promises = {
    offer: queryOffer({ offer_id }),
    shopifyProducts: svrLoadShopifyProducts('manifest-item'),
  }

  const manifestOptions = await promises.shopifyProducts
  const offer = await promises.offer

  return (
    <Container>
      <MainTitle>Add Bottles to Offer [{offer_id}]</MainTitle>
      
      <Row className="mb-4">
        <Col xs="12">
          <Link href={`/offers/${offer_id}`} className="btn btn-secondary">
            Back to Offer Details
          </Link>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <AddManifestForm
            availableManifestSKUs={manifestOptions}
            offerId={offer_id}
            submitAction={addManifestAction}
          />
          <p>
            You must add the tag <span className="badge badge-info">manifest-item</span> in Shopify and then
            reload this page to see the item available to add to an offer here.
          </p>
        </Col>
      </Row>
    </Container>
  )
}