import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
// import AlarmShalat from '../../components/AlarmShalat'
import Alarm from '../../components/Alarm'
import iconShafTengah from '../../public/pict/Rapatkan Shaf Dari Tengah.jpg'
import iconShaf from '../../public/pict/Rapatkan Shaf.jpg'
import Image from 'next/image'

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
    <div className="bg-white-900 font-inter py-[5%] px-[8%]">
      <Alarm ref={alarmRef} />
      <div className="flex flex-col space-y-16">
        <div className="justify-center">
          <h1 className="text-[5rem] font-bold select-none text-center animate-pulse">
            Waktunya Shalat
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-[50%] pr-10">
            <Image src={iconShaf} alt="icon-shaf-shalat" />
          </div>
          <div className="max-w-[50%]">
            <p className="text-center text-[2.3rem] font-mushaf ">
              سَوُّوا صُفُوفَكُمْ , فَإِنَّ تَسْوِيَةَ الصَّفِّ مِنْ تَمَامِ
              الصَّلاةِ
            </p>
            <p className="font-medium text-lg text-justify">
              “Luruskan shaf-shaf kalian, karena lurusnya shaf adalah
              kesempurnaan shalat” (HR. Bukhari no.690, Muslim no.433).
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-10">
          <div className="max-w-[50%]">
            <Image src={iconShafTengah} alt="icon-shaf-shalat" />
          </div>
          <div className="max-w-[50%] space-y-5">
            <p className="text-center text-[2.3rem] font-mushaf leading-tight">
              أقيموا الصفوف وحاذوا بين المناكب وسدوا الخلل ولينوا بأيدي إخوانكم
              ، ولا تذروا فرجات للشيطان ومن وصل صفا وصله الله ومن قطع صفا قطعه
              الل
            </p>
            <p className="font-medium text-md text-justify">
              “Luruskan shaf dan luruskan pundak-pundak serta tutuplah celah.
              Namun berlemah-lembutlah terhadap saudaramu. Dan jangan kalian
              biarkan ada celah untuk setan. Barangsiapa yang menyambung shaf,
              Allah akan menyambungnya. Barangsiapa yang memutus shaf, Allah
              akan memutusnya” (HR. Abu Daud no. 666, dishahihkan Al Albani
              dalam Shohih Abu Daud).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
