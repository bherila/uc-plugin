'use client'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DealSelector from '@/components/DealSelector'
import { useState } from 'react'
import { ShopifyProductVariant } from '@/app/api/shopify/models'

interface NewOfferProps {
  action: (offer_name: string, offer_variant_id: string) => any
  options: ShopifyProductVariant[] | null
}

function NewOfferForm({ action, options }: NewOfferProps) {
  const [offerName, setOfferName] = useState('')
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null)
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        if (selectedVariant) {
          action(offerName, selectedVariant.variantId)
          setOfferName('')
          setSelectedVariant(null)
        }
      }}
      className="pb-3"
    >
      <Form.Group controlId="shopifyDealProduct">
        <Form.Label>Offer Variant ID:</Form.Label>
        <DealSelector
          options={options}
          selectedValue={selectedVariant}
          setSelectedValue={(x) => {
            setSelectedVariant(x)
            setOfferName(x.productName)
          }}
        />
      </Form.Group>
      <Form.Group controlId="offerName">
        <Form.Label>Offer Name:</Form.Label>
        <Form.Control
          type="text"
          value={offerName}
          onChange={(e) => setOfferName(e.currentTarget.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" className="my-3" type="submit" disabled={!selectedVariant || !offerName}>
        Submit
      </Button>
    </Form>
  )
}

export default NewOfferForm
