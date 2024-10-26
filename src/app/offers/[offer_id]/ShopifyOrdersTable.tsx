import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import React, { useCallback, useState } from 'react'
import { post } from '@/lib/fetchWrapper'

export function ShopifyOrdersTable({ shopifyOrderIds }: { shopifyOrderIds: (string | null)[] }) {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {shopifyOrderIds.map(
          (shopifyOrderId) => shopifyOrderId && <Row key={shopifyOrderId} shopifyOrderId={shopifyOrderId} />,
        )}
      </tbody>
    </Table>
  )
}
function Row({ shopifyOrderId }: { shopifyOrderId: string }) {
  const [loading, setLoading] = useState(false)
  const reprocess = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      post('/api/shopify/reprocessOrder/', { shopifyOrderId }).then(() => setLoading(false))
    },
    [setLoading],
  )
  return (
    <tr>
      <td>{shopifyOrderId}</td>
      <td>
        <Button size="sm" variant="outline-warning" onClick={reprocess}>
          Reprocess
        </Button>
      </td>
    </tr>
  )
}
