import React from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import MainTitle from '@/components/main-title'

export default function Loading() {
  return (
    <Container>
      <MainTitle>[#] Loading</MainTitle>
      <p>Getting data from Shopify</p>
      <div>
        <Spinner />
      </div>
    </Container>
  )
}
