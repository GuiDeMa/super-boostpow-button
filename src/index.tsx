import React from 'react'
import './tailwind.output.css'
import BoostButton from './BoostButton'
import { BoostBuyResult } from './BoostButton'

export interface BoostpowButtonOptions {
  content: string
  value: number
  difficulty?: number
  tag?: string
  catgory?: string
  onClick?: () => void
  onSending?: () => void
  onError?: (Error: Error) => void
  onSuccess?: (result: BoostBuyResult) => void
  showDifficulty?: boolean
}

const SuperBoostButton = ({
  value,
  content,
  difficulty,
  showDifficulty,
  onClick,
  onSending,
  onSuccess,
  onError,
}: BoostpowButtonOptions) => {
  return (
    <>
      <BoostButton
        value={value}
        content={content}
        difficulty={difficulty}
        showDifficulty={showDifficulty}
        onClick={onClick}
        onSending={onSending}
        onSuccess={onSuccess}
        onError={onError}
      />
      <div id='superBoostPopupControler' />
    </>
  )
}

export { SuperBoostButton }
