import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// import thumbnail from '../../public/pict/Thumbnail Kajian.jpg'

export default function WaktuKajian() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 900000)
  }, [])
  return (
    <div>
      {/* <Image src={thumbnail} alt="banner-kajian" height={890}></Image> */}
    </div>
  )
}
