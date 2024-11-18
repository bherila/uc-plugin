import React from 'react'
import { Table, Container, Row, Col, Badge } from 'react-bootstrap'
import db from '@/lib/db'
import z from 'zod'
import shopifyGetOrdersWithLineItems from '@/lib/shopifyGetOrdersWithLineItems'
import CurrencyDisplay from '@/components/CurrencyDisplay'
import RenderUTCDate from '@/components/RenderUTCDate'

export default async function ShopifyOrdersPage({ params }: { params: Promise<{ offer_id: string }> }) {
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
      <Row>
        <Col>
          <h2>Orders in Shopify</h2>
          <ul>
            <li>Offer id: {offer_id}</li>
            <li>Variant id: {variant_id}</li>
            <li>Order count: {orders.length}</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Subtotal</th>
                <th>Details</th>
                <th>Shipping price</th>
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
                      <CurrencyDisplay value={order.totalPriceSet.presentmentMoney.amount} digits={2} />
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
