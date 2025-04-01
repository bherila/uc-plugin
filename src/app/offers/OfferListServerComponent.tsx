import Col from 'react-bootstrap/Col'
import Container from '@/components/container'
import DeleteButton from '@/components/DeleteButton'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import React from 'react'
import Link from 'next/link'
import VariantLink from '@/app/offers/VariantLink'
import svrLoadOfferList from '@/server_lib/svrLoadOfferList'
import { revalidatePath } from 'next/cache'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import svrDeleteOffer from '@/server_lib/svrDeleteOffer'
import RenderRelativeTimeInterval from '@/components/RenderRelativeTimeInterval'
import Badge from 'react-bootstrap/Badge'

export default async function OfferListServerComponent() {
  // start loading
  const offerPromise = svrLoadOfferList()
  const shopifyPromise = svrLoadShopifyProducts('deal')

  // wait for loaded
  const { offerListItems: offers } = await offerPromise
  const shopifyData = await shopifyPromise

  // server actions
  const deleteOfferId = async (id: number) => {
    'use server'
    try {
      await svrDeleteOffer(id)
    } finally {
      revalidatePath('/offers')
    }
  }

  return (
    <Container>
      <MainTitle>Offers</MainTitle>
      <Row className="mb-3">
        <Col>
          <Link href="/offers/new" className="btn btn-primary">
            Create New Offer
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Table responsive striped bordered hover size="sm" style={{ fontSize: '10pt' }}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Offer ID</th>
                <th>Offer Name</th>
                <th>Deal SKU</th>
                <th>Date from Shopify Metafield</th>
                <th>Shopify Status</th>
                <th style={{ textAlign: 'right', width: '130px' }}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.offer_id}>
                  <td>{offer.offer_id}</td>
                  <td>
                    <Link href={`/offers/${offer.offer_id}/`}>{offer.offer_name}</Link>
                  </td>
                  <td>
                    {shopifyData.find((d) => d.variantId === offer.offerProductData?.variantId)?.productName}{' '}
                    {offer.offerProductData && (
                      <VariantLink
                        type="deal"
                        variantURI={offer.offerProductData.variantId}
                        shopifyData={shopifyData}
                      />
                    )}{' '}
                    {(offer.offerProductData?.tags ?? []).map((tag) => (
                      <span key={tag} className="px-1">
                        <Badge>{tag}</Badge>{' '}
                      </span>
                    ))}
                  </td>
                  <td style={{ whiteSpace: 'pre' }}>
                    <RenderRelativeTimeInterval
                      startDate={offer.offerProductData.startDate!}
                      endDate={offer.offerProductData.endDate!}
                    />
                  </td>
                  <td>{offer.offerProductData.status}</td>
                  <td align="right">
                    <DeleteButton offerID={offer.offer_id} onDelete={deleteOfferId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
