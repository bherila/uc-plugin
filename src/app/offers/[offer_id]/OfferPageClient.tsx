'use client'

import React, { useEffect, useState } from 'react'
import { V3Offer } from '@/app/api/manifest/models'
import { get, post } from '@/lib/fetchWrapper'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import CriticalErrorBanner from '@/components/CriticalErrorBanner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import AddManifestForm from '@/app/offers/[offer_id]/AddManifestForm'
import groupBySku from '@/lib/groupBySku'
import { Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { ShopifyOrdersTable } from '@/app/offers/[offer_id]/ShopifyOrdersTable'
import DeleteButton from '@/components/DeleteButton'
import clientPutSkuQtyRequest from '@/app/offers/[offer_id]/clientPutSkuQtyRequest'

function OfferPageClient({
  offer_id,
  availableForSale,
  shopifyTitle,
  shopifyInventoryQuantity,
}: {
  offer_id: number
  availableForSale: boolean
  shopifyTitle: string
  shopifyInventoryQuantity: number
}) {
  const [offer, setOffer] = useState<V3Offer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [criticalErrorMessage, setCriticalErrorMessage] = useState('')

  const handleError = (error: any) => {
    console.error(error)
    if (error instanceof Error) setCriticalErrorMessage(error.message)
    if (typeof error === 'string') setCriticalErrorMessage(error)
  }

  useEffect(() => {
    setIsLoading(true)
    post('/api/manifest/', { action: 'offer_get', offer_id: offer_id })
      .then(setOffer)
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }, [])

  const [manifestOptions, setManifestOptions] = useState<
    ShopifyProductVariant[] | null
  >(null)
  useEffect(() => {
    get('/api/shopify/products/?type=manifest-item').then(
      (result) => setManifestOptions(result),
      (err) => console.error(err),
    )
  }, [])

  const manifestGroups = groupBySku(offer?.mf ?? [])

  const numManifestsNotAssigned =
    offer?.mf?.filter((r) => r.assignee_id == null).length ?? 0
  const deficit = numManifestsNotAssigned - shopifyInventoryQuantity

  const shopifyOrderIds = Array.from(
    new Set(offer?.mf.map((r) => r.assignee_id).filter(Boolean)),
  )

  return (
    <Container>
      <MainTitle>
        [{offer?.offer_id}] {offer?.offer_name}
      </MainTitle>
      <p>
        Shopify product id {offer?.offerProductData.variantId} ({shopifyTitle}),{' '}
        {shopifyInventoryQuantity} inventory
      </p>
      {criticalErrorMessage ? (
        <CriticalErrorBanner message={criticalErrorMessage} />
      ) : (
        <Alert variant="info">
          <b>Reminder!</b> Ensure that nobody is able to purchase this product
          online until you are done setting up the bottles. The total number of
          bottles that can be allocated to the offer is based on the quantity
          available of the product id listed above.
        </Alert>
      )}
      {deficit && (
        <Alert variant="danger">
          <p>
            <b>Error!</b> There are QTY={shopifyInventoryQuantity} available of
            the OFFER SKU available in Shopify store, however there are{' '}
            {numManifestsNotAssigned} unassigned bottles in this deal. This will
            result in the deal not allocating correctly.
          </p>
          <p>
            <b>To fix it:</b> Set the quantity available in Shopify to{' '}
            {numManifestsNotAssigned}
            and then refresh this page. If people are actively buying the deal,
            you might have to temporarily disable ordering the product in order
            to set the correct quantity.
          </p>
        </Alert>
      )}
      <Row>
        <Col xs={9}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th># Offered</th>
                <th># Allocated</th>
                <th># Remaining</th>
                <th>% Chance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(manifestGroups).map((manifest) => {
                const totalQuantity = manifestGroups[manifest].length
                const numAllocated =
                  offer?.mf?.filter(
                    (m) => m && m.variant_id == manifest && m.assignee_id,
                  ).length ?? 0
                return (
                  <tr key={manifest}>
                    <td>
                      {offer?.manifestProductData[manifest]?.title ?? '??'}
                      <br />
                      <small>{manifest}</small>
                    </td>
                    <td>{totalQuantity}</td>
                    <td>{numAllocated}</td>
                    <td>{totalQuantity - numAllocated}</td>
                    <td>
                      {offer?.manifestProductData[
                        manifest
                      ]?.percentChance.toFixed(2)}
                      %
                    </td>
                    <td>
                      {numAllocated == 0 && (
                        <DeleteButton
                          onDelete={() => {
                            setIsLoading(true)
                            clientPutSkuQtyRequest(offer_id, {
                              variant_id: manifest,
                              qty: 0,
                            })
                              .then((res) => setOffer(res))
                              .finally(() => setIsLoading(false))
                          }}
                        />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          <h2>Orders</h2>
          <ShopifyOrdersTable shopifyOrderIds={shopifyOrderIds} />
        </Col>
        <Col xs={3}>
          <h2>Add bottles to Offer</h2>
          <AddManifestForm
            availableManifestSKUs={manifestOptions}
            offerId={offer_id}
            setOffer={setOffer}
            handleError={handleError}
          />
          <p>
            You must add the tag{' '}
            <span className="badge badge-info">manifest-item</span> in Shopify
            and then reload this page to see the item available to add to an
            offer here.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default OfferPageClient
