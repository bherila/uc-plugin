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
import maybeUpdateOfferMetafield from '@/server_lib/maybeUpdateOfferMetafield'

export default async function MetafieldsPage({ params }: { params: Promise<{ offer_id: string }> }) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offer_id = z.coerce.number().parse((await params).offer_id)

  const offer = await queryOffer({ offer_id })
  const metafields = await maybeUpdateOfferMetafield(offer)

  return (
    <Container>
      <MainTitle>Metafields for Offer [{offer_id}]</MainTitle>

      <Row className="mb-4">
        <Col xs="12">
          <Link href={`/offers/${offer_id}`} className="btn btn-secondary">
            Back to Offer Details
          </Link>
        </Col>
      </Row>

      {metafields ? (
        <Row>
          <Col xs={12}>
            <h3>offer_v3</h3>
            <textarea style={{ width: '100%', height: '200px' }} readOnly value={metafields.offerV3} />

            <h3 className="mt-4">offer_v3_array</h3>
            <textarea style={{ width: '100%', height: '200px' }} readOnly value={metafields.offerV3Array} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={12}>
            <p>No metafields found for this offer.</p>
          </Col>
        </Row>
      )}
    </Container>
  )
}
