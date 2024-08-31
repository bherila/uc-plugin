import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import groupBySku from '@/lib/groupBySku'
import { Alert } from 'react-bootstrap'
import z from 'zod'
import queryOffer from '@/app/api/manifest/queryOffer'
import maybeUpdateOfferMetafield from '@/server_lib/maybeUpdateOfferMetafield'
import db from '@/lib/db'
import shopify from '@/lib/shopify'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import AddManifestForm from '@/app/offers/[offer_id]/AddManifestForm'
import { revalidatePath } from 'next/cache'
import svrPutSkuQty from '@/server_lib/svrPutSkuQty'
import { addManifestAction } from '@/app/offers/[offer_id]/_addManifestServerAction'
import DeleteButton from '@/components/DeleteButton'

async function OfferPageClient({ offer_id }: { offer_id: number }) {
  const promises = {
    offer: queryOffer({ offer_id }),
    shopifyProducts: svrLoadShopifyProducts('manifest-item'),
    shopifyOfferDetail: genShopifyDetail(offer_id),
  }

  const manifestOptions = await promises.shopifyProducts
  const offer = await promises.offer
  const manifestGroups = groupBySku(offer?.mf ?? [])

  // await maybeUpdateOfferMetafield(offer) // wip: don't backfill on every page load!

  const { inventoryQuantity, product } = await promises.shopifyOfferDetail

  const numManifestsNotAssigned =
    offer?.mf?.filter((r) => r.assignee_id == null).length ?? 0
  const deficit = numManifestsNotAssigned - inventoryQuantity

  const shopifyOrderIds = Array.from(
    new Set(offer?.mf.map((r) => r.assignee_id).filter(Boolean)),
  )

  return (
    <Container>
      <MainTitle>
        [{offer?.offer_id}] {offer?.offer_name}
      </MainTitle>
      <p>
        Shopify product id {offer?.offerProductData.variantId} ({product?.title}
        ), {inventoryQuantity} inventory
      </p>
      {/*{criticalErrorMessage ? (*/}
      {/*  <CriticalErrorBanner message={criticalErrorMessage} />*/}
      {/*) : (*/}
      <Alert variant="info">
        <b>Reminder!</b> Ensure that nobody is able to purchase this product
        online until you are done setting up the bottles. The total number of
        bottles that can be allocated to the offer is based on the quantity
        available of the product id listed above.
      </Alert>
      {/*)}*/}
      {deficit && (
        <Alert variant="danger">
          <p>
            <b>Error!</b> There are QTY={inventoryQuantity} available of the
            OFFER SKU available in Shopify store, however there are{' '}
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

                const deleteManifestAction = async () => {
                  'use server'
                  await svrPutSkuQty(offer_id, [
                    {
                      variant_id: manifest,
                      qty: 0,
                    },
                  ])
                  revalidatePath('/offers/' + offer_id)
                }

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
                          onDelete={deleteManifestAction}
                          offerID={offer_id}
                        />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          {/*<h2>Orders</h2>*/}
          {/*<ShopifyOrdersTable shopifyOrderIds={shopifyOrderIds} />*/}
        </Col>
        <Col xs={3}>
          <h2>Add bottles to Offer</h2>
          <AddManifestForm
            availableManifestSKUs={manifestOptions}
            offerId={offer_id}
            submitAction={addManifestAction}
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

const schema = z.object({
  availableForSale: z.coerce.number().int(),
  inventoryQuantity: z.coerce.number().int(),
  product: z
    .object({
      title: z.string().nullable(),
    })
    .nullable(),
})

async function genShopifyDetail(
  offerId: number,
): Promise<z.infer<typeof schema>> {
  try {
    // get the offer variant name
    const rows: any = await db.query(
      `select offer_variant_id from v3_offer where offer_id = ?`,
      [offerId],
    )
    const offerVariant = z.string().parse(rows[0].offer_variant_id)

    // get the product quantity
    const gqlRoot: any = await shopify.graphql(QUERY, { id: offerVariant })
    return schema.parse(gqlRoot?.node)
  } finally {
    await db.end()
  }
}

export default OfferPageClient
