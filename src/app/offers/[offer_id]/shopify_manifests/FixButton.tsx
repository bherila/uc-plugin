'use client'

import { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function FixButton(props: { onFix: (orderId: string) => Promise<void>; orderId: string }) {
  // loading state
  const [loading, setLoading] = useState(false)

  return (
    <Button
      variant="primary"
      size="sm"
      disabled={loading}
      onClick={async () => {
        setLoading(true)
        await props.onFix(props.orderId)
        setLoading(false)
      }}
    >
      {loading ? 'Fixing...' : 'Fix'}
    </Button>
  )
}
