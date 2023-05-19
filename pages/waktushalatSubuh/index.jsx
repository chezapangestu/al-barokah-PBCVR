import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
// import AlarmShalat from '../../components/AlarmShalat'
import Alarm from '../../components/Alarm'

export default function WaktushalatSubuh() {
  const router = useRouter()
  const alarmRef = useRef()
  useEffect(() => {
    alarmRef.current.play()
    setTimeout(() => {
      router.push('waktuSyuruq')
    }, 300000)
  }, [])
  return (
    <div className="bg-white-900 font-inter p-[15%]">
      <Alarm ref={alarmRef} />
      <div className="">
        <h1 className="text-[10rem] font-bold select-none text-center animate-pulse">
          Waktunya Shalat
        </h1>
      </div>
    </div>
  )
}
