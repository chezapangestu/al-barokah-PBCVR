import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import thumbnail from '../../public/pict/Thumbnail Jumatan 1920x1080.jpg'

export default function WaktuKajian() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 900000)
  }, [])
  return (
    <div>
      <Image src={thumbnail} alt="banner-kajian" height={890}></Image>
    </div>
  )
}
