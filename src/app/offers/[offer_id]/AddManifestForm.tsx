'use client'

import { ShopifyProductVariant } from '@/app/api/shopify/models'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DealSelector from '@/components/DealSelector'
import z from 'zod'
import RequiredBadge from '@/components/RequiredBadge'

interface NewOfferProps {
  offerId: number
  availableManifestSKUs: ShopifyProductVariant[] | null
  submitAction: (offerID: number, variantID: string, qty: number) => any
}

function AddManifestForm({
  offerId,
  availableManifestSKUs,
  submitAction,
}: NewOfferProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [qty, setQty] = useState('1')
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ShopifyProductVariant | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    try {
      if (selectedProductVariant == null) {
        return
      }
      await submitAction(
        offerId,
        selectedProductVariant?.variantId,
        z.coerce.number().default(0).parse(qty),
      )
    } finally {
      setIsSubmitting(false)
      setSelectedProductVariant(null)
      setQty('1')
    }
  }

  const isValidQty = (z.coerce.number().default(0).safeParse(qty).data ?? 0) > 0

  return (
    <Form onSubmit={handleSubmit} method="POST" className="pb-3">
      <Form.Group controlId="shopifyDealProduct">
        <Form.Label>
          Product/Variant:
          {!selectedProductVariant && <RequiredBadge />}
        </Form.Label>
        <div className="mb-3">
          <DealSelector
            options={availableManifestSKUs}
            selectedValue={selectedProductVariant}
            setSelectedValue={setSelectedProductVariant}
          />
        </div>
      </Form.Group>
      <Form.Group controlId="selectSku">
        <Form.Label>
          Quantity in offer:
          {!isValidQty && <RequiredBadge />}
        </Form.Label>
        <Form.Control
          type="text"
          value={qty}
          required
          onChange={(e) => setQty(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        className="my-3"
        type="submit"
        disabled={isSubmitting || !isValidQty || !selectedProductVariant}
      >
        Submit
      </Button>
    </Form>
  )
}

export default AddManifestForm
