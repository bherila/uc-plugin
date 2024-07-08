import { V3OfferListItem } from '@/app/api/manifest/models'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import { useState } from 'react'
import { post } from '@/lib/fetchWrapper'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DealSelector from '@/components/DealSelector'

interface NewOfferProps {
  setOffers: (offers: V3OfferListItem[]) => void
  handleError: (err: any) => void
  options: ShopifyProductVariant[] | null
}

function NewOfferForm({ setOffers, handleError, options }: NewOfferProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [offerName, setOfferName] = useState('')
  const [selectedVariant, setSelectedVariant] =
    useState<ShopifyProductVariant | null>(null)
  const [createdItem, setCreatedItem] = useState<V3OfferListItem | null>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) {
      return
    }
    if (!selectedVariant) {
      console.error('!selectedVariant')
      return
    }
    setIsSubmitting(true)
    post('/api/manifest/', {
      action: 'offer_create',
      offer_name: offerName,
      offer_variant_id: selectedVariant?.variantId,
    })
      .then((response: V3OfferListItem[]) => {
        setOffers(response)
        setCreatedItem(response[0])
      })
      .catch(handleError)
      .finally(() => setIsSubmitting(false))
  }

  return createdItem ? (
    <div>
      <p>Added a deal! You can see it on the left side now.</p>
      <p>
        <Button
          onClick={(e) => {
            e.preventDefault()
            setCreatedItem(null)
          }}
        >
          Create another deal
        </Button>
      </p>
    </div>
  ) : (
    <Form onSubmit={handleSubmit} method="POST" className="pb-3">
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
          required
          onChange={(e) => setOfferName(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        className="my-3"
        type="submit"
        disabled={isSubmitting || !selectedVariant || !offerName}
      >
        Submit
      </Button>
    </Form>
  )
}

export default NewOfferForm
