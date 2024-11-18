import React from 'react'
import { Table, Container, Row, Col, Badge } from 'react-bootstrap'
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

  const ordersFromShopify = await shopifyGetOrdersWithLineItems(orders.map((o) => o.order_id))

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
              </tr>
            </thead>
            <tbody>
              {ordersFromShopify.map((order) => {
                const s1 = order.lineItems.nodes.filter((li) => li.discountedTotalSet.shopMoney.amount > 0)
                const s2 = order.lineItems.nodes.filter((li) => li.discountedTotalSet.shopMoney.amount <= 0)

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
                      </div>
                      <div>
                        <RenderUTCDate utcDate={order.createdAt} />
                      </div>
                    </td>
                    <td>
                      {s1.map((li) => (
                        <div key={li.line_item_id} style={{ borderBottom: '1px dashed #666' }}>
                          {li.quantity} &times; {li.title}
                        </div>
                      ))}
                      {s2.map((li) => (
                        <div key={li.line_item_id} style={{ fontSize: '8pt' }}>
                          {li.quantity} &times; {li.title}
                        </div>
                      ))}
                    </td>
                    <td>
                      <CurrencyDisplay value={order.totalShippingPriceSet.presentmentMoney.amount} digits={2} />
                    </td>
                    <td>{order.email}</td>
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
