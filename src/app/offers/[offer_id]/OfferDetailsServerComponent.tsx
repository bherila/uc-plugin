import React from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import groupBySku from '@/lib/groupBySku'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import queryOffer from '@/app/api/manifest/queryOffer'
import svrLoadShopifyProducts from '@/server_lib/svrLoadShopifyProducts'
import { revalidatePath } from 'next/cache'
import svrPutSkuQty from '@/server_lib/svrPutSkuQty'
import DeleteButton from '@/components/DeleteButton'
import Link from 'next/link'
import genShopifyDetail from '@/server_lib/shopifyDetailGenerator'
import VariantLink from '../VariantLink'
import { setShopifyQtyAction } from './_setShopifyQtyAction'

async function OfferDetailsServerComponent({ offer_id }: { offer_id: number }) {
  const promises = {
    offer: queryOffer({ offer_id }),
    shopifyProducts: svrLoadShopifyProducts('manifest-item'),
    shopifyOfferDetail: genShopifyDetail(offer_id),
    // offerList: svrLoadOfferList(),
  }

  const offer = await promises.offer
  const manifestGroups = groupBySku(offer?.mf ?? [])

  const { inventoryQuantity, product } = await promises.shopifyOfferDetail
  const shopifyProducts = await promises.shopifyProducts
  // const { offerListItems } = await promises.offerList

  // const otherActiveOffers = offerListItems.filter(
  //   (otherOffer) =>
  //     otherOffer.offer_id !== offer_id &&
  //     new Date(otherOffer.offerProductData.startDate ?? 0) <= new Date() &&
  //     new Date(otherOffer.offerProductData.endDate ?? Date.now()) >= new Date(),
  // )

  // const otherOffersQtyByVariant: { [variantId: string]: number } = {}
  // const otherOfferPromises: (V3Offer | null)[] = await Promise.all(
  //   otherActiveOffers.map((otherOffer) => queryOffer({ offer_id: otherOffer.offer_id })),
  // )
  // for (const otherOfferDetails of otherOfferPromises) {
  //   if (!otherOfferDetails) continue
  //   const otherManifestGroups = groupBySku(otherOfferDetails?.mf ?? [])
  //   Object.keys(otherManifestGroups).forEach((variantId) => {
  //     otherOffersQtyByVariant[variantId] =
  //       (otherOffersQtyByVariant[variantId] || 0) + otherManifestGroups[variantId].length
  //   })
  // }

  const numManifestsNotAssigned = offer?.mf?.filter((r) => r.assignee_id == null).length ?? 0
  const deficit = numManifestsNotAssigned - (inventoryQuantity ?? 0)

  const shopifyOrderIds = Array.from(new Set(offer?.mf.map((r) => r.assignee_id).filter(Boolean)))
  const hasOrders = shopifyOrderIds.length > 0

  const hasManifestProducts = Object.keys(manifestGroups).length > 0

  return (
    <Container>
      <MainTitle>
        [{offer?.offer_id}] {offer?.offer_name}
      </MainTitle>

      <p>
        Shopify product id {offer?.offerProductData.variantId} ({product?.title}
        ), {inventoryQuantity} inventory
        {(offer?.offerProductData.weight ?? 0) != 2 ? <Badge bg="danger">Weight should be 2 lbs</Badge> : ''}
      </p>

      <Row className="mb-4">
        <Col xs="12">
          <div className="mb-2">
            <Link href={`/offers/${offer_id}/add-manifest`} className="btn btn-primary me-2">
              Add Bottles to Offer
            </Link>
            <Link
              href={`/offers/${offer_id}/shopify_manifests`}
              className="btn btn-secondary me-2"
              style={{ pointerEvents: hasOrders ? 'auto' : 'none', opacity: hasOrders ? 1 : 0.6 }}
            >
              View order manifests
            </Link>
            <Link
              href={`/offers/${offer_id}/profitability`}
              className="btn btn-secondary me-2"
              style={{
                pointerEvents: hasManifestProducts ? 'auto' : 'none',
                opacity: hasManifestProducts ? 1 : 0.6,
              }}
            >
              View Profitability
            </Link>
            <Link
              href={`/offers/${offer_id}/metafields`}
              className="btn btn-secondary"
              style={{
                pointerEvents: hasManifestProducts ? 'auto' : 'none',
                opacity: hasManifestProducts ? 1 : 0.6,
              }}
            >
              View Metafields
            </Link>
          </div>
        </Col>
      </Row>

      {hasOrders ? null : (
        <Alert variant="info">
          <b>No orders yet. Reminder!</b> Ensure that nobody is able to purchase this product online until you are
          done setting up the bottles. The total number of bottles that can be allocated to the offer is based on
          the quantity available of the product id listed above.
        </Alert>
      )}

      {deficit ? (
        <Alert variant="danger">
          <p>
            <b>Error!</b> There are QTY={inventoryQuantity} available of the OFFER SKU available in Shopify store,
            however there are {numManifestsNotAssigned} unassigned bottles in this deal. This will result in the
            deal not allocating correctly.
          </p>
          <p>
            <b>To fix it:</b> Set the quantity available in Shopify to <span>{numManifestsNotAssigned}</span>, and
            then refresh this page. If people are actively buying the deal, you might have to temporarily disable
            ordering the product in order to set the correct quantity.
          </p>
          <form
            action={async (_: FormData): Promise<void> => {
              'use server'
              if (!offer?.offerProductData.variantId) return
              await setShopifyQtyAction(offer.offerProductData.variantId, offer_id, numManifestsNotAssigned)
            }}
          >
            <button type="submit" className="btn btn-warning">
              Set Shopify Quantity to {numManifestsNotAssigned}
            </button>
          </form>
        </Alert>
      ) : (
        <div />
      )}

      <Row>
        <Col xs={12}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th># Offered</th>
                {hasOrders ? <th># Allocated</th> : null}
                {hasOrders ? <th># Remaining</th> : null}
                <th>% Chance</th>
                <th>Shopify Inventory</th>
                {/* <th>Qty in other offers</th> */}
                {!hasOrders ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {Object.keys(manifestGroups).map((shopifyPVURI) => {
                const totalQuantity = manifestGroups[shopifyPVURI].length
                const numAllocated =
                  offer?.mf?.filter((m) => m && m.variant_id == shopifyPVURI && m.assignee_id).length ?? 0
                const product = offer?.manifestProductData[shopifyPVURI]

                const deleteManifestAction = async () => {
                  'use server'
                  await svrPutSkuQty(offer_id, [
                    {
                      variant_id: shopifyPVURI,
                      qty: 0,
                    },
                  ])
                  revalidatePath('/offers/' + offer_id)
                }

                return (
                  <tr key={shopifyPVURI}>
                    <td>
                      {product?.title ?? '??'}
                      <br />
                      <VariantLink type="manifest-item" variantURI={shopifyPVURI} />
                      {(product?.weight ?? 0) > 1 ? <Badge bg="danger">Weight should be zero</Badge> : ''}
                    </td>
                    <td>{totalQuantity}</td>
                    {hasOrders ? <td>{numAllocated}</td> : null}
                    {hasOrders ? <td>{totalQuantity - numAllocated}</td> : null}
                    <td>{product?.percentChance.toFixed(2)}%</td>
                    <td>{shopifyProducts.find((p) => p.variantId === shopifyPVURI)?.variantInventoryQuantity}</td>
                    {/* <td>{otherOffersQtyByVariant[shopifyPVURI] || 0}</td> */}
                    {!hasOrders ? (
                      <td>
                        {numAllocated == 0 && <DeleteButton onDelete={deleteManifestAction} offerID={offer_id} />}
                      </td>
                    ) : null}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default OfferDetailsServerComponent
