import React, { useRef, useState } from 'react'
import Drawer from './Drawer'
import SuperBoostPopup from './SuperBoostPopup'
import wrapRelayx from 'stag-relayx'
import './tailwind.css'

export interface BoostBuyResult {
  txid: string
  txhex: string
  job: any
}

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

const BoostButton = ({ content, difficulty, showDifficulty, onSending, onSuccess, onError }: BoostpowButtonOptions) => {
  const [action, setAction] = useState('')
  const [superBoost, setSuperBoost] = useState(false)
  const [boostPopupOpen, setBoostPopupOpen] = useState(false)
  const timerRef = useRef<React.RefObject<() => void>>(null)
  const isLongPress = useRef<boolean>(false)
  const superBoostLoading = useRef<React.RefObject<() => void>>(null)

  function startPressTimer() {
    isLongPress.current = false
    setAction('')

    //@ts-ignore
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      setSuperBoost(true)
      setAction('longpress')
    }, 690)

    //@ts-ignore
    superBoostLoading.current = setTimeout(() => {
      if (!isLongPress.current) {
        return
      }
      //@ts-ignore
      superBoostLoading.current = true
      setAction('superBoost')
      setBoostPopupOpen(true)
      setSuperBoost(false)
    }, 2180)
  }

  const boost = async (contentTxid: string) => {
    //@ts-ignore
    const stag = wrapRelayx(relayone)

    if (onSending) {
      onSending()
    }

    try {
      const boost_result: BoostBuyResult = await stag.boost.buy({
        content: contentTxid,
        value: 124_000,
        difficulty: 0.025,
      })

      if (onSuccess) {
        onSuccess(boost_result)
      }
    } catch (error: any) {
      console.log('stag.boost.error', error)
      if (onError) {
        onError(error)
      }
    }

    //@ts-ignore
    relayone
      .send({
        currency: 'USD',
        amount: 0.001,
        to: '1BZKajw1muBnFDEZMkAbE6Foscw3idzLRH', // boostpow.com revenue address
      })
      .then((result: any) => {
        console.log('relayone.send.reward.result', result)
      })
      .catch((error: any) => {
        console.log('relayone.send.reward.error', error)
      })
  }

  const handleBoost = async () => {
    try {
      console.log('handleboost', action)
      if (action === 'click') {
        await boost(content)
      }

      if (action === 'longpress') {
        console.log('superboost canceled')

        return
      }

      if (action === 'superboost') {
        console.log('superboost trigered')

        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleOnMouseDown(e: any) {
    e.preventDefault()
    e.stopPropagation()
    if (boostPopupOpen) {
      return
    }
    console.log('handleOnMouseDown')
    startPressTimer()
    setAction('click')
  }

  function handleOnMouseUp(e: any) {
    e.preventDefault()
    e.stopPropagation()
    console.log('handleOnMouseUp')
    setSuperBoost(false)
    //@ts-ignore
    clearTimeout(timerRef.current)
    //@ts-ignore
    clearTimeout(superBoostLoading.current)
  }

  function handleOnTouchStart(e: any) {
    e.preventDefault()
    e.stopPropagation()
    if (boostPopupOpen) {
      return
    }
    console.log('handleOnTouchStart')
    startPressTimer()
    setAction('click')
    handleBoost()
  }

  function handleOnTouchEnd(e: any) {
    e.preventDefault()
    e.stopPropagation()
    console.log('handleOnTouchEnd')
    setSuperBoost(false)
    //@ts-ignore
    clearTimeout(timerRef.current)
    //@ts-ignore
    clearTimeout(superBoostLoading.current)
  }

  return (
    <>     
      <div id='superBoostPopupControler' />
      <div
        onClick={handleBoost}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleOnTouchEnd}
        className={`justify-center flex group items-center w-fit relative select-none`}
      >
        <div
          className={
            superBoost && !boostPopupOpen
              ? `absolute justify-center min-h-[42px] min-w-[42px] rounded-full border-t-4 border-green-500 animate-spin`
              : 'hidden'
          }
        />
        <div
          className={`hidden group-hover:block animate-ping absolute ${
            !showDifficulty ? 'justify-center' : 'left-[18px]'
          } min-h-[33px] min-w-[33px] rounded-full bg-blue-200`}
        ></div>
        <div
          className={`hidden group-hover:block animate-ping  delay-75 absolute ${
            !showDifficulty ? 'justify-center' : 'left-[24px]'
          } min-h-[22px] min-w-[22px] rounded-full bg-blue-400`}
        ></div>
        <div
          className={`hidden group-hover:block animate-ping  delay-100 absolute ${
            !showDifficulty ? 'justify-center' : 'left-[29px]'
          } min-h-[11px] min-w-[11px] rounded-full bg-blue-600`}
        ></div>
        <svg
          viewBox='0 0 65 65'
          className='relative min-h-[69px] min-w-[69px] stroke-1 stroke-gray-500 dark:stroke-gray-300 rounded-full group-hover:stroke-blue-500'
        >
          <path
            d='M40.1719 32.6561C40.1719 35.6054 38.5079 38.1645 36.0692 39.4499C35.002 40.0122 33.7855 36.2423 32.4945 36.2423C31.1288 36.2423 29.8492 40.0696 28.7418 39.4499C26.4007 38.1359 24.8228 35.5308 24.8228 32.6561C24.8228 28.4214 28.2598 24.9844 32.4945 24.9844C36.7291 24.9844 40.1719 28.4157 40.1719 32.6561Z'
            className='stroke-gray-500 dark:stroke-gray-300 group-hover:stroke-blue-500'
            fill='transparent'
          ></path>
        </svg>
        {showDifficulty && (
          <p className='text-gray-500 dark:text-gray-300 group-hover:text-blue-500 -ml-3'>{difficulty?.toFixed(3)}</p>
        )}
      </div>
      <Drawer selector='#boostPopupControler' isOpen={boostPopupOpen} onClose={() => setBoostPopupOpen(false)}>
        <SuperBoostPopup contentTxId={content} onClose={() => setBoostPopupOpen(false)} />
      </Drawer>
    </>
  )
}

export default BoostButton
