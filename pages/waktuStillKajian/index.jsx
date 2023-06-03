import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import thumbnail from '../../public/pict/Thumbnail Youtube 1920x1080 - Ust Hervi.jpg'

export default function WaktuStillKajian() {
  return (
    <div>
      <Image src={thumbnail} alt="banner-kajian" height={890}></Image>
    </div>
  )
}
