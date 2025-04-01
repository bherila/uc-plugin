'use client'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DealSelector from '@/components/DealSelector'
import { useState } from 'react'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import Alert from 'react-bootstrap/Alert'

interface NewOfferProps {
  action: (offer_name: string, offer_variant_id: string, offer_product_name: string) => Promise<void>
  options: ShopifyProductVariant[] | null
  existingOfferVariantIds: string[]
}

function NewOfferForm({ action, options, existingOfferVariantIds }: NewOfferProps) {
  const [offerName, setOfferName] = useState('')
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedVariant) {
      setError('Please select a variant')
      return
    }

    if (!offerName.trim()) {
      setError('Offer name cannot be empty')
      return
    }

    try {
      setIsSubmitting(true)
      await action(offerName, selectedVariant.variantId, selectedVariant.productName)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="pb-3">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Form.Group controlId="shopifyDealProduct">
        <Form.Label>Offer Variant ID:</Form.Label>
        <DealSelector
          options={options}
          selectedValue={selectedVariant}
          setSelectedValue={(x) => {
            setSelectedVariant(x)
            setOfferName(x.productName)
            setError(null)
          }}
          disabledOptions={existingOfferVariantIds}
        />
      </Form.Group>

      <Form.Group controlId="offerName">
        <Form.Label>Offer Name:</Form.Label>
        <Form.Control
          type="text"
          value={offerName}
          onChange={(e) => {
            setOfferName(e.currentTarget.value)
            setError(null)
          }}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        className="my-3"
        type="submit"
        disabled={!selectedVariant || !offerName || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  )
}

export default NewOfferForm
