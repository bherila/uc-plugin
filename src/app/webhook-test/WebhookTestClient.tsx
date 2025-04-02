'use client'

import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import RenderUTCDate from '@/components/RenderUTCDate'

type AuditLog = {
  id: number
  event_ts: string
  event_name: string
  event_ext: string
}

type WebhookTestClientProps = {}

export default function WebhookTestClient({}: WebhookTestClientProps) {
  const [jsonInput, setJsonInput] = useState('')
  const [response, setResponse] = useState<{ status: number; body: string | null }>({ status: 0, body: null })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const parsedJson = JSON.parse(jsonInput) // Validate JSON first

      const res = await fetch('/api/shopify/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      })

      setResponse({
        status: res.status,
        body: await res.text(),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {response.status > 0 && (
            <Alert variant={response.status === 200 ? 'success' : 'warning'} className="mt-3">
              <strong>Response Status:</strong> {response.status}
              {response.body && (
                <>
                  <br />
                  <strong>Response Body:</strong>
                  <pre>{response.body}</pre>
                </>
              )}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Webhook JSON Payload</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder='Paste Shopify webhook JSON here (e.g., {"admin_graphql_api_id": "gid://shopify/Order/123456"})'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Webhook
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
