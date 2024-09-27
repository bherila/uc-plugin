'use client'

// Countdown.tsx
import React, { useState, useEffect } from 'react'

interface Props {
  utcDate: string
}

const Countdown: React.FC<Props> = ({ utcDate }) => {
  const [tick, setTick] = useState(0)
  const [countdown, setCountdown] = useState('')
  const [targetDate, setTargetDate] = useState<Date | null>(null)

  useEffect(() => {
    const date = new Date(utcDate)
    setTargetDate(date)
  }, [utcDate])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick(tick + 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [tick])

  useEffect(() => {
    if (targetDate && !isNaN(targetDate.getTime())) {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (diff > 0) {
        setCountdown(`in ${days}d, ${hours}h, ${minutes}m, ${seconds}s`)
      } else {
        setCountdown(`${days}d, ${hours}h, ${minutes}m, ${seconds}s ago`)
      }
    }
  }, [tick, targetDate])

  return !targetDate || isNaN(targetDate.getTime()) ? null : (
    <span>{countdown}</span>
  )
}

export default Countdown
