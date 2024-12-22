'use client'

import { useState, useEffect } from 'react'
import { URLSearchParams } from 'url'

const useUrlState = <T>(key: string, defaultValue: T): [T, (newValue: T, push: boolean) => void] => {
  // Get the current URLSearchParams
  const searchParams = new URLSearchParams(window.location.search)

  // Initialize the state with the value from the URLSearchParams or the default value
  const param = searchParams.get(key)
  const [value, setValue] = useState<T>(param != null ? JSON.parse(param) : defaultValue)

  // Update the state when the URLSearchParams change
  useEffect(() => {
    const handlePopstate = () => {
      const newSearchParams = new URLSearchParams(window.location.search)
      const param = searchParams.get(key)
      setValue(param != null ? JSON.parse(param) : defaultValue)
    }
    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [key, defaultValue])

  // Create a setter function that updates the state and the URLSearchParams
  const setter = (newValue: T, push: boolean = true) => {
    setValue(newValue)
    searchParams.set(key, JSON.stringify(newValue))
    if (push) {
      window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`)
    } else {
      window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`)
    }
  }

  return [value, setter]
}

export default useUrlState
