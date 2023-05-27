import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
// import Alarm from '../../components/Alarm'

export default function WaktuadzanIsya() {
  const router = useRouter()
  // const alarmRef = useRef()
  // const [isTimeUp, setIsTimeUp] = useState(false)

  // const timeUp = () => {
  //   // reset()
  //   // setIsTimeUp(true)
  // }

  useEffect(() => {
    // alarmRef.current.play()
    setTimeout(() => {
      router.push('iqomahIsya')
    }, 300000)
  }, [])

  return (
    <div className="bg-white-900 font-inter p-[10%]">
      {/* <Alarm ref={alarmRef} /> */}
      <div className="">
        <h1 className="text-[10rem] font-bold select-none text-center animate-pulse">
          Waktunya Adzan
        </h1>
      </div>
    </div>
  )
}
