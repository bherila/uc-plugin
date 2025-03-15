import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Link from 'next/link'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { RedirectType } from 'next/dist/client/components/redirect'
import queryOffer from '@/app/api/manifest/queryOffer'
import z from 'zod'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ProfitabilityUI from './Profitability.client'
import currency from 'currency.js'

export default async function ProfitabilityPage({ params }: { params: Promise<{ offer_id: string }> }) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offerId = z.coerce.number().parse((await params).offer_id)
  const offer = await queryOffer({ offer_id: offerId })

  if (!offer) {
    return <div>Offer not found</div>
  }

  return (
    <Container>
      <Row className="mt-4 mb-4">
        <Col>
          <Link href={`/offers/${offerId}/`} className="btn btn-secondary">
            Back
          </Link>
        </Col>
      </Row>

      <MainTitle>Profitability Analysis for {offer.offer_name}</MainTitle>
      <ProfitabilityUI
        offerPrice={currency(offer.offerProductData.maxVariantPriceAmount).value}
        manifestProductData={offer.manifestProductData}
      />
    </Container>
  )
}
