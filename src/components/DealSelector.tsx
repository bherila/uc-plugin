'use client'
import Spinner from 'react-bootstrap/Spinner'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import Form from 'react-bootstrap/Form'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  selectedValue: ShopifyProductVariant | null
  setSelectedValue: (value: ShopifyProductVariant) => void
  options: ShopifyProductVariant[] | null
}

const DealSelector: React.FC<Props> = ({ options, selectedValue, setSelectedValue }) => {
  const [searchText, setSearchText] = useState('')

  const filteredOptions = useMemo(() => {
    if (!searchText) {
      return options
    }

    // match any item which has json that contains ANY OF THE
    // WORDS in searchText, case insensitive
    const searchWords = searchText.toLowerCase().split(' ').filter(Boolean)
    return options?.filter((option) => {
      const lcjson = JSON.stringify(option).toLowerCase()
      return searchWords.every((word) => lcjson.includes(word))
    })
  }, [searchText])

  useEffect(() => {
    if (filteredOptions && filteredOptions.length === 1) {
      setSelectedValue(filteredOptions[0])
    }
  }, [filteredOptions])

  if (options == null) return <Spinner />
  if (options.length == 0) return <div>No items</div>

  return (
    filteredOptions && (
      <div>
        <InputGroup>
          <InputGroup.Text>Search</InputGroup.Text>
          <FormControl
            placeholder="type, then pick below"
            aria-label="Search"
            aria-describedby="search-icon"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </InputGroup>
        <select
          size={8}
          style={{ width: '100%' }}
          className="form-control"
          value={JSON.stringify(selectedValue)}
          onChange={(event) => {
            const val = event.currentTarget.value
            setSelectedValue(!val ? null : JSON.parse(val))
          }}
        >
          {filteredOptions.length != 1 && <option value="">({filteredOptions.length} options)</option>}
          {filteredOptions.map((option) => (
            <option key={option.productId + '|' + option.variantId} value={JSON.stringify(option)}>
              {option.productName}
              {option.variantName}
              {filteredOptions.length === 1 ? ' ✅' : ''}
            </option>
          ))}
        </select>
      </div>
    )
  )
}

export default DealSelector
