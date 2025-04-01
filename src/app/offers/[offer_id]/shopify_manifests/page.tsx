import React from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import z from 'zod'
import shopifyGetOrdersWithLineItems from '@/server_lib/shopifyGetOrdersWithLineItems'
import CurrencyDisplay from '@/components/CurrencyDisplay'
import RenderUTCDate from '@/components/RenderUTCDate'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'
import { getSession } from '@/server_lib/session'
import { revalidatePath } from 'next/cache'
import AuthRoutes from '@/app/auth/AuthRoutes'
import shopifyProcessOrder from '@/server_lib/shopifyProcessOrder'
import FixButton from './FixButton'
import { shopifyCancelOrder } from '@/server_lib/shopifyCancelOrder'
import SoldManifestsDetails, { SoldManifestItem } from './SoldManifestsDetails.client'
import queryOffer from '@/app/api/manifest/queryOffer'
import currency from 'currency.js'
import { prisma } from '@/server_lib/prisma'

export const maxDuration = 60

async function cancelOrder(orderId: string, offerId: number) {
  'use server'
  try {
    await shopifyCancelOrder(`gid://shopify/Order/${orderId}`, true)
    revalidatePath(`/offers/${offerId}/shopify_manifests`)
    return { success: true }
  } catch (error) {
    console.error('Error canceling order:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}

export default async function ShopifyOrdersPage({
  params,
  searchParams,
}: {
  params: Promise<{ offer_id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offer_id = z.coerce.number().parse((await params).offer_id)

  async function reProcessShopifyOrder(order_id: string) {
    'use server'
    await shopifyProcessOrder(order_id)
    revalidatePath(`/offers/${offer_id}/shopify_manifests`)
  }

  const offer = await prisma.v3_offer.findFirstOrThrow({
    where: { offer_id },
    select: { offer_variant_id: true },
  })
  const variant_id = offer.offer_variant_id

  const orders = await prisma.v3_order_to_variant.findMany({
    where: { variant_id },
    select: { order_id: true, variant_id: true },
  })

  const allManifests: SoldManifestItem[] = []
  const offerData = await queryOffer({ offer_id })
  const offerSkuVariantId = offerData?.offerProductData.variantId
  const offerPrice = offerData?.offerProductData.maxVariantPriceAmount ?? 0

  const ordersFromShopify = (await shopifyGetOrdersWithLineItems(orders.map((o) => o.order_id))).map((order) => {
    const orderLineItems = order.lineItems.nodes
    const purchasedItems = orderLineItems.filter((li) => li.discountedTotalSet.shopMoney.amount > 0)
    const upgradeItems = orderLineItems.filter((li) => li.discountedTotalSet.shopMoney.amount <= 0)

    let amountPaid = currency(purchasedItems[0]?.discountedTotalSet.shopMoney.amount ?? 0).divide(
      upgradeItems.length,
    )
    for (const item of upgradeItems ?? []) {
      if (item.variant.variant_graphql_id !== offerSkuVariantId) {
        allManifests.push({
          wineName: item.title,
          winnerEmail: order.email ?? '',
          amountPaid: amountPaid.value,
          wineValue: item.originalUnitPriceSet.shopMoney.amount,
          wineCost: currency(
            offerData?.manifestProductData[item.variant.variant_graphql_id]?.unitCost?.amount ?? 0,
          ).value,
        })
      }
    }

    // check if total qty of each purchasedItems equals total qty of upgradeItems
    const totalPurchasedItemsQty = purchasedItems.reduce((total, li) => total + li.quantity, 0)
    const totalUpgradeItemsQty = upgradeItems.reduce((total, li) => {
      // Free items don't count against allocation
      const isFreeItem =
        li.originalUnitPriceSet.shopMoney.amount == 0 &&
        currency(offerData?.manifestProductData[li.variant.variant_graphql_id]?.unitCost?.amount ?? 0).value == 0
      return isFreeItem ? total : total + li.quantity
    }, 0)
    const isQtyEqual = totalPurchasedItemsQty === totalUpgradeItemsQty

    // total value of each purchasedItems and upgradeItems
    const purchasedItemsTotalValue = purchasedItems.reduce(
      (total, li) => total + li.originalUnitPriceSet.shopMoney.amount * li.quantity,
      0,
    )
    const upgradeItemsTotalValue = upgradeItems.reduce(
      (total, li) => total + li.originalUnitPriceSet.shopMoney.amount * li.quantity,
      0,
    )
    const upgradeItemsTotalCost = upgradeItems.reduce((total, li) => {
      const unitCost = offerData?.manifestProductData[li.variant.variant_graphql_id]?.unitCost?.amount ?? 0
      return total.add(currency(unitCost).multiply(li.quantity))
    }, currency(0)).value

    return {
      ...order,
      purchasedItems,
      upgradeItems,
      isQtyEqual,
      totalPurchasedItemsQty,
      totalUpgradeItemsQty,
      purchasedItemsTotalValue,
      upgradeItemsTotalValue,
      upgradeItemsTotalCost,
    }
  })

  // sort by the date of the order descending
  ordersFromShopify.sort((b, a) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // sort ordersFromShopify by upgradeItemsTotalValue descending
  if ((await searchParams)['upgradesFirst'] !== 'false') {
    ordersFromShopify.sort((a, b) => {
      return b.upgradeItemsTotalValue - a.upgradeItemsTotalValue
    })
  }

  // then, sort ordersFromShopify so that isQtyEqual is false first
  ordersFromShopify.sort((a, b) => {
    if (a.isQtyEqual !== b.isQtyEqual) {
      return a.isQtyEqual ? 1 : -1
    }
    return 0
  })

  // sum totalPurchasedItemsQty and totalUpgradeItemsQty
  const totalPurchasedItemsQty = ordersFromShopify.reduce(
    (total, order) => total + order.totalPurchasedItemsQty,
    0,
  )
  const totalUpgradeItemsQty = ordersFromShopify.reduce((total, order) => total + order.totalUpgradeItemsQty, 0)

  const totalPurchasedItemsTotalValue = ordersFromShopify.reduce(
    (total, order) => total + order.purchasedItemsTotalValue,
    0,
  )
  const totalUpgradeItemsTotalValue = ordersFromShopify.reduce(
    (total, order) => total + order.upgradeItemsTotalValue,
    0,
  )
  const totalUpgradeItemsTotalCost = ordersFromShopify.reduce(
    (total, order) => total + order.upgradeItemsTotalCost,
    0,
  )

  return (
    <>
      <Container>
        {(await searchParams)['status'] === 'success' && (
          <Alert variant="success" className="mt-4">
            Order successfully canceled
          </Alert>
        )}
        {(await searchParams)['error'] && (
          <Alert variant="danger" className="mt-4">
            {(await searchParams).error}
          </Alert>
        )}
        <Row className="mt-4">
          <Col>
            <h2>Shopify Order Manifests (for offer id {offer_id})</h2>
            <Table striped bordered hover size="sm" style={{ width: '60%' }}>
              <tbody>
                <tr>
                  <td>Shopify Variant ID</td>
                  <td>{variant_id}</td>
                </tr>
                <tr>
                  <td>Order Count</td>
                  <td>{orders.length}</td>
                </tr>
                <tr>
                  <td>Total PURCHASED Items Qty</td>
                  <td>{totalPurchasedItemsQty}</td>
                </tr>
                <tr>
                  <td>Total UPGRADE Items Qty</td>
                  <td>
                    {totalUpgradeItemsQty}{' '}
                    {totalPurchasedItemsQty === totalUpgradeItemsQty ? '✅ (equal to purchase qty)' : '❌'}
                  </td>
                </tr>
                <tr>
                  <td>Total Purchased Items (Amount Spent by Customer)</td>
                  <td>
                    <CurrencyDisplay value={totalPurchasedItemsTotalValue} digits={2} />
                  </td>
                </tr>
                <tr>
                  <td>Total Upgrade Items Value</td>
                  <td>
                    <CurrencyDisplay value={totalUpgradeItemsTotalValue} digits={2} /> and total cost{' '}
                    <CurrencyDisplay value={totalUpgradeItemsTotalCost} digits={2} />
                  </td>
                </tr>
                <tr>
                  <td>Net 'Consumer Surplus' from Offer</td>
                  <td>
                    <CurrencyDisplay
                      value={totalUpgradeItemsTotalValue - totalPurchasedItemsTotalValue}
                      digits={2}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Net Profit from Offer (Excluding Shipping &amp; Handling)</td>
                  <td>
                    <CurrencyDisplay
                      value={totalPurchasedItemsTotalValue - totalUpgradeItemsTotalCost}
                      digits={2}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs="12">
            <Link href={`/offers/${offer_id}`} className="btn btn-secondary">
              Back
            </Link>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs="12">
            <SoldManifestsDetails soldManifestItems={allManifests} />
          </Col>
        </Row>
        {/* <Row className="mb-4">
          <Col xs="12">
            <UpgradesAtTopToggle />
          </Col>
        </Row> */}
      </Container>
      <Container fluid={true}>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Details</th>
                  <th>Amt paid</th>
                  <th>Got value</th>
                  <th>Wine cost</th>
                  <th>
                    Net profit
                    <br />
                    before s&h
                  </th>
                  <th>Shipping</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ordersFromShopify.map((order) => {
                  const isCancel = order.cancelledAt != null
                  const orderIdNumeric = order.id.replace('gid://shopify/Order/', '')
                  const cancelAction = async () => {
                    'use server'
                    const result = await cancelOrder(orderIdNumeric.toString(), offer_id)
                    redirect(
                      result.success
                        ? `/offers/${offer_id}/shopify_manifests?status=success`
                        : `/offers/${offer_id}/shopify_manifests?error=${encodeURIComponent(result.error || 'Failed to cancel order')}`,
                    )
                  }
                  return (
                    <tr key={order.id}>
                      <td>
                        <div>
                          <Link href={`/offers/${offer_id}/order/${orderIdNumeric}`}>{orderIdNumeric}</Link>
                          {isCancel ? (
                            <Badge
                              style={{ marginLeft: '7px' }}
                              bg="danger"
                              title={`Cancelled at: ${order.cancelledAt}`}
                            >
                              Canceled
                            </Badge>
                          ) : null}
                          {!order.isQtyEqual ? (
                            <Badge style={{ marginLeft: '7px' }} bg="danger">
                              Allocation error
                            </Badge>
                          ) : null}
                        </div>
                        <div>
                          <RenderUTCDate utcDate={order.createdAt} />
                        </div>
                      </td>
                      <td>
                        {order.purchasedItems.map((li) => (
                          <div key={li.line_item_id} style={{ borderBottom: '1px dashed #666' }}>
                            {li.quantity} &times; {li.title} ({li.discountedTotalSet.shopMoney.amount})
                          </div>
                        ))}
                        {order.upgradeItems.map((li) => (
                          <div key={li.line_item_id} style={{ fontSize: '8pt' }}>
                            {li.quantity} &times; {li.title}
                          </div>
                        ))}
                      </td>
                      <td>
                        <CurrencyDisplay value={order.purchasedItemsTotalValue} digits={2} />
                      </td>
                      <td>
                        <CurrencyDisplay value={order.upgradeItemsTotalValue} digits={2} />
                      </td>
                      <td>
                        <CurrencyDisplay value={order.upgradeItemsTotalCost} digits={2} />
                      </td>
                      <td>
                        <CurrencyDisplay
                          value={order.purchasedItemsTotalValue - order.upgradeItemsTotalCost}
                          digits={2}
                        />
                      </td>
                      <td>
                        <CurrencyDisplay value={order.totalShippingPriceSet.shopMoney.amount} digits={2} />
                      </td>
                      <td>{order.email}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <Link
                          href={`/offers/${offer_id}/order/${orderIdNumeric}/`}
                          className="btn btn-primary btn-sm"
                        >
                          View Log
                        </Link>
                        &nbsp;
                        {!order.isQtyEqual && (
                          <FixButton onFix={reProcessShopifyOrder} orderId={orderIdNumeric.toString()} />
                        )}
                        {!order.isQtyEqual && !isCancel && (
                          <>
                            &nbsp;
                            <form action={cancelAction}>
                              <Button variant="danger" size="sm" type="submit">
                                Cancel Order
                              </Button>
                            </form>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}
