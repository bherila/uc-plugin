'use client'

import { post } from '@/lib/fetchWrapper'
import { useState, useCallback } from 'react'
import Button from 'react-bootstrap/esm/Button'

export default function ShopifyOrdersTableRow({ shopifyOrderId }: { shopifyOrderId: string }) {
  const [loading, setLoading] = useState(false)
  const reprocess = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      post('/api/shopify/reprocessOrder/', { shopifyOrderId }).then(() => setLoading(false))
    },
    [setLoading, shopifyOrderId],
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
