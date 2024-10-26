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
import NewOfferForm from '@/app/offers/NewOfferForm'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import svrDeleteOffer from '@/server_lib/svrDeleteOffer'
import { z } from 'zod'
import svrCreateOffer from '@/server_lib/svrCreateOffer'
import RenderUTCDate from '@/components/RenderUTCDate'
import Countdown from '@/components/Countdown'
import RenderRelativeTimeInterval from '@/components/RenderRelativeTimeInterval'
import { Stack } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'

export default async function OfferListServerComponent() {
  // start loading
  const offerPromise = svrLoadOfferList()
  const shopifyPromise = svrLoadShopifyProducts('deal')

  // wait for loaded
  const { offerListItems: offers } = await offerPromise
  const shopifyData = await shopifyPromise

  // server actions
  const newOffer = async (offer_name: string, offer_variant_id: string) => {
    'use server'
    const parsed = z
      .object({
        offer_name: z.string(),
        offer_variant_id: z.string(),
      })
      .parse({
        offer_name,
        offer_variant_id,
      })
    await svrCreateOffer(parsed)
    revalidatePath('/offers')
  }

  const deleteOfferId = async (id: number) => {
    'use server'
    try {
      await svrDeleteOffer(id)
    } finally {
      revalidatePath('/offers')
    }
  }

  const options =
    shopifyData == null
      ? null
      : shopifyData.filter((opt) => !offers.find((o) => o.offerProductData?.variantId === opt.variantId))

  return (
    <Container>
      <MainTitle>Offers</MainTitle>
      <Row>
        <Col xs={9}>
          <Table responsive striped bordered hover size="sm" style={{ fontSize: '10pt' }}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Offer ID</th>
                <th>Offer Name</th>
                <th>Product ID</th>
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
                  <td style={{ whiteSpace: 'pre' }}>
                    {offer.offerProductData && (
                      <VariantLink type="deal" variantURI={offer.offerProductData.variantId} />
                    )}
                    <Stack direction="horizontal" gap={1}>
                      {offer.offerProductData.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </Stack>
                  </td>
                  <td style={{ whiteSpace: 'pre' }}>
                    <RenderRelativeTimeInterval
                      startDate={offer.offerProductData.startDate}
                      endDate={offer.offerProductData.endDate}
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
        <Col xs={3}>
          <h2>New Offer</h2>
          <NewOfferForm action={newOffer} options={options} />
          <p>
            To add a new offer, create a product in shopify for the Deal. This specifies the buy-in price and all
            the details that wil be shown to the customer will be created in this Deal Product.
          </p>
          <p>
            You must add the tag <span className="badge badge-info">deal</span> in Shopify and then reload this
            page to see the Deal Product to select.
          </p>
        </Col>
      </Row>
    </Container>
  )
}
