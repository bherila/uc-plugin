'use client'
import Spinner from 'react-bootstrap/Spinner'
import { ShopifyProductVariant } from '@/app/api/shopify/models'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  selectedValue: ShopifyProductVariant | null
  setSelectedValue: (value: ShopifyProductVariant) => void
  options: ShopifyProductVariant[] | null
  disabledOptions?: string[]
}

const DealSelector: React.FC<Props> = ({ options, selectedValue, setSelectedValue, disabledOptions = [] }) => {
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
  }, [searchText, options])

  // Sort options: enabled options first, then disabled options
  const sortedOptions = useMemo(() => {
    if (!filteredOptions) return []

    return [
      ...filteredOptions.filter((option) => !disabledOptions.includes(option.variantId)),
      ...filteredOptions.filter((option) => disabledOptions.includes(option.variantId)),
    ]
  }, [filteredOptions, disabledOptions])

  useEffect(() => {
    if (sortedOptions && sortedOptions.length === 1) {
      setSelectedValue(sortedOptions[0])
    }
  }, [sortedOptions])

  if (options == null) return <Spinner />
  if (options.length == 0) return <div>No items</div>

  return (
    sortedOptions && (
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
          {sortedOptions.length != 1 && <option value="">({sortedOptions.length} options)</option>}
          {sortedOptions.map((option) => (
            <option
              key={option.productId + '|' + option.variantId}
              value={JSON.stringify(option)}
              disabled={disabledOptions.includes(option.variantId)}
            >
              {option.productName}
              {option.variantName}
              {disabledOptions.includes(option.variantId) ? ' (Already in use)' : ''}
              {sortedOptions.length === 1 ? ' ✅' : ''}
            </option>
          ))}
        </select>
      </div>
    )
  )
}

export default DealSelector
