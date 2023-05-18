import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AlarmShalat from '../../components/AlarmShalat'

export default function Waktushalat() {
  const router = useRouter()
  const alarmRefShalat = useRef()
  // const [isTimeUp, setIsTimeUp] = useState(false)

  // const timeUp = () => {
  //   // reset()
  //   // setIsTimeUp(true)
  // }

  useEffect(() => {
    alarmRefShalat.current.play()
    setTimeout(() => {
      router.push('/')
    }, 30000)
  }, [])

  return (
    <div className="bg-white-900 font-inter p-[15%]">
      <AlarmShalat ref={alarmRefShalat} />
      <div className="">
        <h1 className="text-[10rem] font-bold select-none text-center animate-pulse">
          Waktunya Shalat
        </h1>
      </div>
    </div>
  )
}
