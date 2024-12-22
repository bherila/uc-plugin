import React from 'react'
import { redirect, RedirectType } from 'next/navigation'
import { getSession } from '@/server_lib/session'
import AuthRoutes from '@/app/auth/AuthRoutes'
import z from 'zod'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import Link from 'next/link'
import db from '@/server_lib/db'
import shopifyGetOrdersWithLineItems from '@/server_lib/shopifyGetOrdersWithLineItems'

const paramsSchema = z.object({
  offer_id: z.coerce.number(),
  order_id: z.string(),
})

// async function cancelOrder(orderId: string, offerId: number) {
//   'use server'
//   try {
//     await shopifyCancelOrder(`gid://shopify/Order/${orderId}`, true)
//     revalidatePath(`/offers/${offerId}/order/${orderId}/`)
//     return { success: true }
//   } catch (error) {
//     console.error('Error canceling order:', error)
//     return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
//   }
// }

export default async function AuditLogPage({
  params,
  searchParams,
}: {
  params: Promise<{ offer_id: string; order_id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  const { offer_id, order_id } = paramsSchema.parse(await params)

  const auditLogs = (await db.query(
    'SELECT id, event_ts, event_name, event_ext, order_id FROM v3_audit_log WHERE order_id = ? ORDER BY id asc',
    [order_id],
  )) as Array<{
    id: number
    event_ts: Date
    event_name: string
    event_ext: string
    order_id: string
  }>

  const orderDetails = (await shopifyGetOrdersWithLineItems([`gid://shopify/Order/${order_id}`]))[0]
  const isCancel = orderDetails?.cancelledAt != null

  return (
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
      <Row className="mt-4 mb-4">
        <Col>
          <Link href={`/offers/${offer_id}/shopify_manifests`} className="btn btn-secondary">
            Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>
            Audit Log for Order {order_id}
            {isCancel && (
              <Badge bg="danger" className="ms-2">
                Canceled
              </Badge>
            )}
          </h2>
          {/* {!isCancel && (
            <form
              action={async () => {
                'use server'
                const result = await cancelOrder(order_id, offer_id)
                redirect(
                  result.success 
                    ? `/offers/${offer_id}/order/${order_id}/?status=success` 
                    : `/offers/${offer_id}/order/${order_id}/?error=${encodeURIComponent(result.error || 'Failed to cancel order')}`
                )
              }}
              className="mt-2"
            >
              <Button variant="danger" type="submit">
                Cancel Order
              </Button>
            </form>
          )} */}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Order Details</h3>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th>Created At</th>
                <td>{orderDetails?.createdAt}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{orderDetails?.email}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{isCancel ? 'Canceled' : 'Active'}</td>
              </tr>
              {isCancel && (
                <tr>
                  <th>Canceled At</th>
                  <td>{orderDetails?.cancelledAt}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Audit Log</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '200px' }}>ID</th>
                <th style={{ width: '200px' }}>Time</th>
                <th style={{ width: '200px' }}>Event</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.event_ts.toString()}</td>
                  <td>{log.event_name}</td>
                  <td style={{ whiteSpace: 'pre-wrap' }}>
                    <textarea value={log.event_ext} readOnly rows={3} style={{ width: '100%' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
