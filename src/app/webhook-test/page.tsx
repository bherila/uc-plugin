import { getSession } from '@/server_lib/session'
import { redirect, RedirectType } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { prisma } from '@/server_lib/prisma'
import MainTitle from '@/components/main-title'
import WebhookTestClient from './WebhookTestClient'
import RenderUTCDate from '@/components/RenderUTCDate'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

export default async function WebhookTestPage() {
  const session = await getSession()
  if (session?.uid == null || !session?.ax_uc) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
  }

  // Fetch last 100 audit logs on the server
  const auditLogs = await prisma.v3_audit_log.findMany({
    take: 100, // last 100 entries
    orderBy: {
      id: 'desc',
    },
  })

  return (
    <>
      <MainTitle>Shopify Webhook Test</MainTitle>
      <WebhookTestClient />

      {auditLogs.length > 0 && (
        <Container>
          <Row className="mt-4">
            <Col>
              <h3>Last 100 Audit Log Entries</h3>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Timestamp</th>
                    <th>Event Name</th>
                    <th>Event Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>
                        <RenderUTCDate utcDate={log.event_ts.toISOString()} />
                      </td>
                      <td>{log.event_name}</td>
                      <td style={{ overflow: 'auto' }}>
                        <textarea rows={5} style={{ width: '100%' }} defaultValue={log.event_ext?.toString()} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}
