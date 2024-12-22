'use client'
import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

interface CriticalErrorBannerProps {
  message: string
}

const CriticalErrorBanner: React.FC<CriticalErrorBannerProps> = ({ message }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

export default CriticalErrorBanner
