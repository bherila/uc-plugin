'use client'
import Col from 'react-bootstrap/Col'
import Container from '@/components/container'
import CriticalErrorBanner from '@/components/CriticalErrorBanner'
import DeleteButton from '@/components/DeleteButton'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { V3OfferListItem } from '@/app/api/manifest/models'
import { get, post } from '@/lib/fetchWrapper'
import React, { useCallback, useEffect, useState } from 'react'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import NewOfferForm from '@/app/offers/NewOfferForm'
import Link from 'next/link'
import VariantLink from '@/app/offers/VariantLink'

export default function OfferPageClient() {
  const [offers, setOffers] = useState<V3OfferListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [criticalErrorMessage, setCriticalErrorMessage] = useState<
    string | null
  >(null)
  const setIsNotLoading = useCallback(() => setIsLoading(false), [setIsLoading])
  const handleError = useCallback(
    (error: any) => {
      console.error(error)
      if (error instanceof Error) {
        setCriticalErrorMessage(error.message)
      }
      if (typeof error === 'string') {
        setCriticalErrorMessage(error)
      }
    },
    [setCriticalErrorMessage],
  )

  useEffect(() => {
    setIsLoading(true)
    post('/api/manifest/', { action: 'offer_list' })
      .then(setOffers)
      .catch(handleError)
      .finally(setIsNotLoading)
  }, [])

  const [shopifyData, setShopifyData] = useState<
    ShopifyProductVariant[] | null
  >(null)
  useEffect(() => {
    get('/api/shopify/products/?type=deal')
      .then(setShopifyData)
      .catch(handleError)
  }, [])

  const deleteOfferId = async (id: number) => {
    setOffers(offers.filter((offer) => offer.offer_id !== id))
    setIsLoading(true)
    post('/api/manifest/', {
      action: 'offer_delete',
      offer_id: id,
    })
      .then(setOffers)
      .catch(handleError)
      .finally(setIsNotLoading)
  }

  return (
    <Container>
      <MainTitle>Offers</MainTitle>
      {criticalErrorMessage && (
        <CriticalErrorBanner message={criticalErrorMessage} />
      )}
      <Row>
        <Col xs={9}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Offer ID</th>
                <th>Offer Name</th>
                <th style={{ textAlign: 'right', width: '175px' }}>
                  Product ID
                </th>
                <th style={{ textAlign: 'right', width: '130px' }}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.offer_id}>
                  <td>{offer.offer_id}</td>
                  <td>
                    <Link href={`/offers/${offer.offer_id}/`}>
                      {offer.offer_name}
                    </Link>
                  </td>
                  <td align="right">
                    <VariantLink
                      variantURI={offer.offer_variant_id}
                      shopifyData={shopifyData}
                    />
                  </td>
                  <td align="right">
                    <DeleteButton
                      onDelete={() => deleteOfferId(offer.offer_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
        <Col xs={3}>
          <h2>New Offer</h2>
          <NewOfferForm
            {...{ setOffers, handleError }}
            options={
              shopifyData == null
                ? null
                : shopifyData.filter(
                    (opt) =>
                      !offers.find((o) => o.offer_variant_id === opt.variantId),
                  )
            }
          />
          <p>
            To add a new offer, create a product in shopify for the Deal. This
            specifies the buy-in price and all the details that wil be shown to
            the customer will be created in this Deal Product.
          </p>
          <p>
            You must add the tag <span className="badge badge-info">deal</span>{' '}
            in Shopify and then reload this page to see the Deal Product to
            select.
          </p>
        </Col>
      </Row>
    </Container>
  )
}
