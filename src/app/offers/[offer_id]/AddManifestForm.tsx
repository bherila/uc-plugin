import { SkuQty, V3Offer, V3OfferListItem } from '@/app/api/manifest/models'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import { useState } from 'react'
import { post } from '@/lib/fetchWrapper'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DealSelector from '@/components/DealSelector'
import z from 'zod'
import clientPutSkuQtyRequest from '@/app/offers/[offer_id]/clientPutSkuQtyRequest'

interface NewOfferProps {
  offerId: number
  setOffer: (offer: V3Offer) => void
  handleError: (err: any) => void
  availableManifestSKUs: ShopifyProductVariant[] | null
}

function AddManifestForm({
  offerId,
  setOffer,
  handleError,
  availableManifestSKUs,
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
      const response = await clientPutSkuQtyRequest(offerId, {
        variant_id: selectedProductVariant?.variantId,
        qty: z.coerce.number().default(0).parse(qty),
      })
      if (response) {
        setOffer(response)
      } else {
        throw new Error(`Failed to create offer`)
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} method="POST" className="pb-3">
      <Form.Group controlId="shopifyDealProduct">
        <Form.Label>Product/Variant:</Form.Label>
        <DealSelector
          options={availableManifestSKUs}
          selectedValue={selectedProductVariant}
          setSelectedValue={setSelectedProductVariant}
        />
      </Form.Group>
      <Form.Group controlId="selectSku">
        <Form.Label>Quantity in offer:</Form.Label>
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
        disabled={isSubmitting || !z.coerce.number().default(0).parse(qty)}
      >
        Submit
      </Button>
    </Form>
  )
}

export default AddManifestForm
