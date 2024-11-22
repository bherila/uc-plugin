import React from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import db from '@/lib/db'
import z from 'zod'
import shopifyGetOrdersWithLineItems from '@/lib/shopifyGetOrdersWithLineItems'
import CurrencyDisplay from '@/components/CurrencyDisplay'
import RenderUTCDate from '@/components/RenderUTCDate'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'
import { getSession } from '@/lib/session'
import AuthRoutes from '@/app/auth/AuthRoutes'

export default async function ShopifyOrdersPage({ params }: { params: Promise<{ offer_id: string }> }) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const offer_id = z.coerce.number().parse((await params).offer_id)

  const variant_id = (
    (await db.query(`select offer_variant_id from v3_offer where offer_id = ?`, [offer_id])) as any[]
  )[0].offer_variant_id

  const orders = (await db.query(`select order_id, variant_id from v3_order_to_variant where variant_id = ?`, [
    variant_id,
  ])) as any[]

  const ordersFromShopify = (await shopifyGetOrdersWithLineItems(orders.map((o) => o.order_id))).map((order) => {
    const purchasedItems = order.lineItems.nodes.filter((li) => li.discountedTotalSet.shopMoney.amount > 0)
    const upgradeItems = order.lineItems.nodes.filter((li) => li.discountedTotalSet.shopMoney.amount <= 0)

    // check if total qty of each purchasedItems equals total qty of upgradeItems
    const totalPurchasedItemsQty = purchasedItems.reduce((total, li) => total + li.quantity, 0)
    const totalUpgradeItemsQty = upgradeItems.reduce((total, li) => total + li.quantity, 0)
    const isQtyEqual = totalPurchasedItemsQty === totalUpgradeItemsQty

    return {
      ...order,
      purchasedItems,
      upgradeItems,
      isQtyEqual,
    }
  })

  // sort ordersFromShopify so that isQtyEqual is false first
  ordersFromShopify.sort((a, b) => {
    if (a.isQtyEqual !== b.isQtyEqual) {
      return a.isQtyEqual ? 1 : -1
    }
    return 0
  })

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Shopify Order Manifests (for offer id {offer_id})</h2>
          <ul>
            <li>Variant id: {variant_id}</li>
            <li>Order count: {orders.length}</li>
          </ul>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs="12">
          <Link href={`/offers/${offer_id}`} className="btn btn-secondary">
            Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Details</th>
                <th>Shipping price</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersFromShopify.map((order) => {
                const isCancel = order.cancelledAt != null

                return (
                  <tr key={order.id}>
                    <td>
                      <div>
                        {order.id.replace('gid://shopify/Order/', '')}
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
                          {li.quantity} &times; {li.title}
                        </div>
                      ))}
                      {order.upgradeItems.map((li) => (
                        <div key={li.line_item_id} style={{ fontSize: '8pt' }}>
                          {li.quantity} &times; {li.title}
                        </div>
                      ))}
                    </td>
                    <td>
                      <CurrencyDisplay value={order.totalShippingPriceSet.presentmentMoney.amount} digits={2} />
                    </td>
                    <td>{order.email}</td>
                    <td>
                      <Button variant="outline-primary">View Log</Button>
                    </td>
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
