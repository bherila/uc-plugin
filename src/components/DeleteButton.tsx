'use client'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

interface Props {
  offerID: number
  onDelete: (offer_id: number) => Promise<void>
}

const DeleteButton: React.FC<Props> = ({ offerID, onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleClick = async () => {
    if (isConfirming) {
      await onDelete(offerID)
      setIsConfirming(false)
    } else {
      setIsConfirming(true)
    }
  }

  const handleBlur = () => {
    setIsConfirming(false)
  }

  return (
    <Button
      variant={isConfirming ? 'danger' : ''}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      {isConfirming ? <span>Click again to confirm</span> : '♻️'}
    </Button>
  )
}

export default DeleteButton
