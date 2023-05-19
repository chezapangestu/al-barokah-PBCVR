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

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 300000)
  }, [])

  return (
    <div className="syuruq-main py-[115px]">
      <Alarm ref={alarmRef} />
      <div className="flex flex-col bg-black opacity-75 text-white p-20">
        <div className="px-10 space-y-28">
          <p className="font-medium text-4xl">
            Dari Abu Umamah, Rasulullah shallallahu ‘alaihi wa sallam bersabda,
          </p>
          <h1 className="text-5xl font-base select-none text-center">
            مَنْ صَلَّى صَلاةَ الصُّبْحِ فِي مَسْجِدِ جَمَاعَةٍ يَثْبُتُ فِيهِ
            حَتَّى يُصَلِّيَ سُبْحَةَ الضُّحَى، كَانَ كَأَجْرِ حَاجٍّ، أَوْ
            مُعْتَمِرٍ تَامًّا حَجَّتُهُ وَعُمْرَتُهُ
          </h1>
          <p className="font-base text-3xl text-justify">
            “Barangsiapa yang mengerjakan shalat shubuh dengan berjama’ah di
            masjid, lalu dia tetap berdiam di masjid sampai melaksanakan shalat
            sunnah Dhuha, maka ia seperti mendapat pahala orang yang berhaji
            atau berumroh secara sempurna.”
          </p>
        </div>
      </div>
    </div>
  )
}
