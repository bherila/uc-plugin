// CountdownTimer.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Countdown from './Countdown'
import Badge from 'react-bootstrap/Badge'
import { Stack } from 'react-bootstrap'

interface Props {
  startDate: string
  endDate: string
}

const CountdownTimer: React.FC<Props> = ({ startDate, endDate }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [startDateObject, setStartDateObject] = useState<Date | null>(null)
  const [endDateObject, setEndDateObject] = useState<Date | null>(null)
  const [startDateIsValid, setStartDateIsValid] = useState(false)
  const [endDateIsValid, setEndDateIsValid] = useState(false)

  useEffect(() => {
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    setStartDateObject(startDateObj)
    setEndDateObject(endDateObj)

    setStartDateIsValid(!isNaN(startDateObj.getTime()))
    setEndDateIsValid(!isNaN(endDateObj.getTime()))
  }, [startDate, endDate])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  if (
    !currentTime ||
    !startDateObject ||
    !endDateObject ||
    !startDateIsValid ||
    !endDateIsValid
  ) {
    return <span>Invalid dates</span>
  }

  if (currentTime < startDateObject) {
    return (
      <span>
        In <Countdown utcDate={startDate} />
      </span>
    )
  } else if (currentTime >= startDateObject && currentTime < endDateObject) {
    return (
      <Stack direction="horizontal" gap={1}>
        <Badge bg="success">Ends in</Badge>
        <Countdown utcDate={endDate} />
      </Stack>
    )
  } else {
    return (
      <Stack direction="horizontal" gap={1}>
        <Badge bg="danger">Ended</Badge>
        <Countdown utcDate={endDate} />
      </Stack>
    )
  }
}

export default CountdownTimer
