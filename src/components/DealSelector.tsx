import Spinner from 'react-bootstrap/Spinner'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import Form from 'react-bootstrap/Form'

interface Props {
  selectedValue: ShopifyProductVariant | null
  setSelectedValue: (value: ShopifyProductVariant) => void
  options: ShopifyProductVariant[] | null
}

const DealSelector: React.FC<Props> = ({
  options,
  selectedValue,
  setSelectedValue,
}) => {
  if (options == null) return <Spinner />
  if (options.length == 0) return <div>No items</div>
  return (
    <Form.Select
      value={JSON.stringify(selectedValue)}
      onChange={(event) => {
        setSelectedValue(JSON.parse(event.currentTarget.value))
      }}
    >
      <option value="">-select-</option>
      {options.map((option) => (
        <option
          key={option.productId + '|' + option.variantId}
          value={JSON.stringify(option)}
        >
          {option.productName}
          {option.variantName}
        </option>
      ))}
    </Form.Select>
  )
}

export default DealSelector
