import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
// import AlarmShalat from '../../components/AlarmShalat'
import Alarm from '../../components/Alarm'

export default function WaktuSyuruq() {
  const router = useRouter()
  const alarmRef = useRef()
  // const [isTimeUp, setIsTimeUp] = useState(false)

  // const timeUp = () => {
  //   // reset()
  //   // setIsTimeUp(true)
  // }

  //   useEffect(() => {
  //     alarmRef.current.play()
  //     setTimeout(() => {
  //       router.push('/')
  //     }, 30000)
  //   }, [])

  return (
    <div className="syuruq-main px-72 py-56">
      <Alarm ref={alarmRef} />
      <div className="flex flex-col space-y-10 bg-black opacity-80 text-white rounded-lg p-10">
        <p className="font-medium text-xl">
          Dari Abu Umamah, Rasulullah shallallahu ‘alaihi wa sallam bersabda,
        </p>
        <h1 className="text-3xl font-bold select-none text-center">
          مَنْ صَلَّى صَلاةَ الصُّبْحِ فِي مَسْجِدِ جَمَاعَةٍ يَثْبُتُ فِيهِ
          حَتَّى يُصَلِّيَ سُبْحَةَ الضُّحَى، كَانَ كَأَجْرِ حَاجٍّ، أَوْ
          مُعْتَمِرٍ تَامًّا حَجَّتُهُ وَعُمْرَتُهُ
        </h1>
        <p className="font-medium text-2xl">
          “Barangsiapa yang mengerjakan shalat shubuh dengan berjama’ah di
          masjid, lalu dia tetap berdiam di masjid sampai melaksanakan shalat
          sunnah Dhuha, maka ia seperti mendapat pahala orang yang berhaji atau
          berumroh secara sempurna.”3
        </p>
      </div>
    </div>
  )
}
