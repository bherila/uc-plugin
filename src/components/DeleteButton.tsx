import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

interface Props {
  onDelete: () => void
}

const DeleteButton: React.FC<Props> = ({ onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleClick = () => {
    if (isConfirming) {
      onDelete()
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
