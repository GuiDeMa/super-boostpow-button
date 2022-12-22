import React from 'react'
import 'index.css'
import BoostButton from './BoostButton'

export interface BoostpowButtonOptions {
    content: string;
    value: number;
    currency: string;
    difficulty?: number;
    tag?: string;
    catgory?: string;
    onClick?: Function;
    onSending?: Function;
    onError?: Function;
    onSuccess?: Function;
    showDifficulty?: boolean;
}

const index = ({ value, currency, content, difficulty, showDifficulty, onClick, onSending, onSuccess, onError }: BoostpowButtonOptions) => {
  return (
    <>
    <BoostButton value={value} currency={currency} content={content} difficulty={difficulty} showDifficulty={showDifficulty} />
    <div id="superBoostPopupControler"/>
    </>
  )
}

export default index