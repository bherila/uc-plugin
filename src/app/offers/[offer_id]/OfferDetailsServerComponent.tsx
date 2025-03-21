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
import AddManifestForm from '@/app/offers/[offer_id]/AddManifestForm'
import { revalidatePath } from 'next/cache'
import svrPutSkuQty from '@/server_lib/svrPutSkuQty'
import { addManifestAction } from '@/app/offers/[offer_id]/_addManifestServerAction'
import DeleteButton from '@/components/DeleteButton'
import MetafieldServerComponent from './MetafieldServerComponent'
import Link from 'next/link'
import genShopifyDetail from '@/server_lib/shopifyDetailGenerator'
import VariantLink from '../VariantLink'
import { setShopifyQtyAction } from './_setShopifyQtyAction'

async function OfferDetailsServerComponent({ offer_id }: { offer_id: number }) {
  const promises = {
    offer: queryOffer({ offer_id }),
    shopifyProducts: svrLoadShopifyProducts('manifest-item'),
    shopifyOfferDetail: genShopifyDetail(offer_id),
  }

  const manifestOptions = await promises.shopifyProducts
  const offer = await promises.offer
  const manifestGroups = groupBySku(offer?.mf ?? [])

  const { inventoryQuantity, product } = await promises.shopifyOfferDetail

  const numManifestsNotAssigned = offer?.mf?.filter((r) => r.assignee_id == null).length ?? 0
  const deficit = numManifestsNotAssigned - inventoryQuantity

  const shopifyOrderIds = Array.from(new Set(offer?.mf.map((r) => r.assignee_id).filter(Boolean)))
  const hasOrders = shopifyOrderIds.length > 0

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
            <Link
              href={`/offers/${offer_id}/shopify_manifests`}
              className="btn btn-secondary me-2"
              style={{ pointerEvents: hasOrders ? 'auto' : 'none', opacity: hasOrders ? 1 : 0.6 }}
            >
              View order manifests
            </Link>
            <Link href={`/offers/${offer_id}/profitability`} className="btn btn-secondary">
              View Profitability
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
              await setShopifyQtyAction(
                offer.offerProductData.variantId,
                offer_id,
                numManifestsNotAssigned,
              )
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
        <Col xs={8}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th># Offered</th>
                {hasOrders ? <th># Allocated</th> : null}
                {hasOrders ? <th># Remaining</th> : null}
                <th>% Chance</th>
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
          <MetafieldServerComponent offer={offer} />
        </Col>
        <Col xs={4}>
          <h2>Add bottles to Offer</h2>
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

export default OfferDetailsServerComponent
