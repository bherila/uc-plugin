'use client'
import Form from 'next/form'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function FilterCustomers() {
  const queryParams = useSearchParams()
  const [minAmount, setMinAmount] = useState(queryParams.get('min_amount') ?? '')
  const [maxAmount, setMaxAmount] = useState(queryParams.get('max_amount') ?? '')
  const [varietal, setVarietal] = useState(queryParams.get('varietal') ?? '')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'min_amount':
        setMinAmount(value)
        break
      case 'max_amount':
        setMaxAmount(value)
        break
      case 'varietal':
        setVarietal(value)
        break
      default:
        break
    }
  }

  return (
    <Form action={''}>
      <input
        type="text"
        placeholder="min_amount"
        name="min_amount"
        value={minAmount}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="max_amount"
        name="max_amount"
        value={maxAmount}
        onChange={handleInputChange}
      />
      <input type="text" placeholder="varietal" name="varietal" value={varietal} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </Form>
  )
}
