'use client'
// RenderUTCDate.tsx
import React from 'react'

interface Props {
  utcDate: string
}

const RenderUTCDate: React.FC<Props> = ({ utcDate }) => {
  const localCustomDateString = getLocalCustomDateString(utcDate)
  return <span>{localCustomDateString ?? utcDate}</span>
}

function isValidDate(date: Date) {
  return !isNaN(date.getTime())
}

const getLocalCustomDateString = (utcDateString: string) => {
  // Parse the UTC date string
  const utcDate = new Date(utcDateString)
  if (!isValidDate(utcDate)) {
    return null
  }

  // Get the local date parts
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
  }
  const localDatePart = utcDate.toLocaleDateString('en-US', optionsDate)

  // Get the local time parts
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12-hour format
  }
  const localTimePart = utcDate.toLocaleTimeString('en-US', optionsTime)

  // Combine the date and time parts
  const localCustomDateString = `${localDatePart}, ${localTimePart}`

  return localCustomDateString
}

export default RenderUTCDate
