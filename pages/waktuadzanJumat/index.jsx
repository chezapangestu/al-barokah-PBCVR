import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function WaktuadzanJumat() {
  const router = useRouter()
  useEffect(() => {
    // alarmRef.current.play()
    setTimeout(() => {
      router.push('/')
    }, 300000)
  }, [])
  return (
    <div className="bg-white-900 font-inter p-[15%]">
      {/* <Alarm ref={alarmRef} /> */}
      <div className="">
        <h1 className="text-[10rem] font-bold select-none text-center animate-pulse">
          Waktunya Adzan
        </h1>
      </div>
    </div>
  )
}
