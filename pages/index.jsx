import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ErrorCard from '../components/ErrorCards'
import JadwalSholatCard from '../components/JadwalSholatCard'
import Layout from '../components/Layouts'
import Loading from '../components/Loading'
import Tracker from '../components/Tracker'
import { coords } from '../constants/location'
import { indonesianDate, indonesianName } from '../utils/jadwal-sholat'
import LimaWaktuShalat from '../components/LimaWaktuShalat'
import logoAlBarokah from '../public/pict/logo-al-barokah-192x192.png'
import BottomNavigation from '../components/BottomNavigation'
import RunningText from '../components/RunningText'
import Alarm from '../components/Alarm'
import BarcodeInfaq from '../public/pict/Barcode - Infaq.jpg'
import BarcodeWakaf from '../public/pict/Barcode - Wakaf.jpg'
import BarcodeZakat from '../public/pict/Barcode - Zakat.jpg'
import logoBSI from '../public/pict/logo-bsi.png'

// import useSound from 'use-sound'
// import beepSfx from '../public/alarm.mp3'

export default function JadwalSolatHariIni() {
  // Memformat tanggal
  let d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = d.getFullYear()

  const [jadwalSholat, setJadwalSholat] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [coordinates, setCoordinates] = useState({
    latitude: coords.lat,
    longitude: coords.lng,
  })

  const [displayMap, setDisplayMap] = useState(false)
  // const [displayIqomah, setDisplayIqomah] = useState(false)

  const [today, setToday] = useState(Number(dd))
  const [tanggal, setTanggal] = useState(indonesianDate())
  const [jam, setJam] = useState(indonesianDate(true))
  const [next, setNext] = useState({ name: '-', countDown: 0 })

  const router = useRouter()

  const handle = useFullScreenHandle()

  const alarmRef = useRef()

  const hariIni = d.getDay()

  // Fetch jadwal sholat
  useEffect(() => {
    // Query string
    const query = new URLSearchParams({
      ...coordinates,
      method: 15,
      tune: '-2,-2,4,2,1,6,0,-2,-3',
    })
    const apiURL = `https://api.aladhan.com/v1/timings/${today}-${mm}-${yyyy}?${query}`

    setLoading(true)
    fetch(apiURL)
      .then((res) => res.json())
      .then(({ data }) => {
        delete data.timings['Sunset'] // Menghapus waktu sunset, karna Sunset === Maghrib
        delete data.timings['Firstthird'] // Menghapus waktu Firstthird
        delete data.timings['Lastthird'] // Menghapus waktu Lastthird
        // delete data.timings['Midnight'] // Menghapus waktu Midnight "TAHAJUD"
        // console.log(data.timings['Sunset'])
        // console.log(data)
        setJadwalSholat(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [today, coordinates])

  // Mengatur waktu tanggal, jam, hari ini.
  useEffect(() => {
    const tId = setTimeout(() => {
      setTanggal(indonesianDate())
      setJam(indonesianDate(true))

      // Sholat berikutnya.
      if (jadwalSholat) {
        if (jadwalSholat.timings) {
          // Mengambil sholat yang waktunya sudah paling dekat
          const times = Object.values(jadwalSholat.timings)
            .map((v) => new Date(`${yyyy}-${mm}-${dd}T${v}`).getTime())
            .map((v, i) => [
              Object.keys(jadwalSholat.timings)[i],
              v - Date.now(),
            ])
            .sort((a, b) => a[1] - b[1])
            .filter((v) => v[1] > 0)

          // Memperbarui tanggal jika jadwal hari ini sudah selesai
          if (times.length === 0) {
            setToday(Number(dd) + 1)
            setTanggal(indonesianDate(false, `${yyyy}-${mm}-${today}`))
          }

          // Mengatur countdown
          const distance = times[0][1]
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          )
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)

          // Memperbarui info sholat berikutnya
          setNext({
            name: times[0][0],
            countDown: `${(hours < 10 ? '0' : '') + hours}:${
              (minutes < 10 ? '0' : '') + minutes
            }:${(seconds < 10 ? '0' : '') + seconds}`,
          })
        }
      }
    }, 1000)

    return () => clearTimeout(tId)
  })

  // Memutar audio adzan
  useEffect(() => {
    const adzan = document.getElementById('adzan')
    document.body.onclick = () => {
      adzan.play()
      adzan.pause()
    }

    const { name, countDown } = next
    // console.log(hariIni)
    switch (name) {
      case 'Sunrise':
        if (countDown === '00:00:08' && name === 'Sunrise') {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktushalatSyuruq')
          }, 8000)
        }
      case 'Fajr':
        if (countDown === '00:00:08' && name === 'Fajr') {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktuadzanSubuh')
          }, 8000)
        }
      case 'Dhuhr':
        // UNTUK HARI JUMAT SHALAT JUMAT
        if (countDown === '00:00:08' && name === 'Dhuhr' && hariIni === 5) {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktuadzanJumat')
          }, 8000)
        } else if (
          countDown === '00:00:08' &&
          name === 'Dhuhr' &&
          hariIni !== 5
        ) {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktuadzanDzuhur')
          }, 8000)
        }
      case 'Asr':
        if (countDown === '00:00:08' && name === 'Asr') {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktuadzanAshar')
          }, 8000)
        }
      case 'Maghrib':
        if (countDown === '00:00:08' && name === 'Maghrib') {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktuadzanMaghrib')
          }, 8000)
        }
      case 'Isha':
        if (countDown === '00:00:08' && name === 'Isha') {
          alarmRef.current.play()
          setTimeout(() => {
            router.push('waktuadzanIsya')
          }, 8000)
        }

        break
      // adzan.play()

      default:
        break
    }
  })

  // const [play] = useSound(beepSfx)

  return (
    <Layout name="Jadwal Sholat">
      <div className="hero-main">
        <Alarm ref={alarmRef} />
        {/* <FullScreen handle={handle}> */}
        {loading && <Loading message="Memuat jadwal sholat..." />}
        {error && (
          <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
        )}

        {/* Set Display Map */}
        <div
          className={`fixed inset-0 p-3 z-20 bg-white duration-300 ${
            displayMap ? 'visible' : 'invisible'
          }`}
        >
          <h2 className="text-lg font-bold text-main-500">Atur Lokasi</h2>
          <p>Silakan klik lokasi pada map untuk mengganti lokasi.</p>

          {/* <Tracker callback={(coords) => setCoordinates(coords)} /> */}

          <div className="space-x-3">
            <button
              onClick={() => setDisplayMap(!displayMap)}
              className="px-3 py-2 rounded-lg bg-main-500 text-white"
            >
              Simpan
            </button>
            <button
              onClick={() => setDisplayMap(!displayMap)}
              className="px-3 py-2 rounded-lg bg-zinc-400 text-white"
            >
              Kembali
            </button>
          </div>
        </div>
        {/* End Of Display Map */}

        {/* Set Display Iqomah */}
        {/* <div
        className={`fixed inset-0 p-52 z-40 bg-red-500 opacity-10 duration-300 ${
          displayIqomah ? 'visible' : 'invisible'
        }`}
      >
        <h1>This is IQOMAH START NOW</h1>
      </div> */}
        {/* End Of Display Iqomah */}

        {jadwalSholat && (
          <>
            {jadwalSholat.date && (
              <>
                {/* MAIN JAM */}
                <div className="bg-white dark:bg-black-900 fixed w-full top-0 left-0 z-10 border-b border-gray-200 dark:border-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-50 transition duration-300 ease-in-out">
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-3 px-[5%] py-10 items-center">
                    <div className="flex flex-col">
                      <p className="font-bold text-3xl ">{tanggal}</p>

                      <p className="flex font-medium text-2xl">
                        {jadwalSholat.date.hijri.day}{' '}
                        {jadwalSholat.date.hijri.month.en}{' '}
                        {jadwalSholat.date.hijri.year}
                      </p>
                      {/* <div className="flex space-x-3 mt-5">
                          <button
                            onClick={() => setDisplayMap(!displayMap)}
                            className=" h-6 w-auto px-2 rounded-lg bg-main-500 opacity-30 text-white text-xs"
                            title="Klik untuk mengatur lokasi sesuai keinginan"
                          >
                            Update lokasi
                          </button>
                          <button
                            className="h-6 w-auto px-2 rounded-lg bg-main-500 opacity-30 text-white text-xs"
                            onClick={handle.enter}
                          >
                            Enter fullscreen
                          </button>
                          <button
                            className="h-6 w-auto px-2 rounded-lg bg-main-500 opacity-30 text-white text-xs"
                            onClick={handle.exit}
                          >
                            Exit
                          </button>
                        </div> */}
                    </div>
                    <div className="flex">
                      <div className="max-w-[70px]">
                        <Image
                          src={logoAlBarokah}
                          height={5}
                          width={150}
                          alt="logo-al-barokah-pbcvr"
                        />
                      </div>
                      <div>
                        <h1 className="text-4xl font-black">
                          Masjid Al-Barokah
                        </h1>
                        <p className="font-medium text-xl">
                          Pesona Bali City View Residence
                        </p>
                      </div>
                    </div>
                    <div className="lg:text-right md:text-right sm:text-left text-left">
                      <p className="font-black text-7xl">{jam}</p>
                    </div>
                    {/* -------------------------++++ */}

                    {/* <p className="flex items-center font-medium text-2xl">
                  {jadwalSholat.date.hijri.day}{' '}
                  {jadwalSholat.date.hijri.month.en}{' '}
                  {jadwalSholat.date.hijri.year}
                </p> */}
                  </div>

                  {/* AKHIR MAIN JAM */}

                  {/* <p>Berikut jadwal sholat hari ini.</p> */}

                  {/* TIMEZONE */}
                  {/* <p className="flex items-center mt-3">
                  {jadwalSholat.meta.timezone}
                </p> */}
                  {/* AKHIR TIMEZONE */}

                  {/* <div>
                  <p className="text-2xl">menuju</p>
                  <p className="text-2xl font-bold">
                    {indonesianName(next.name)}
                  </p>
                </div> */}

                  {/* <p className="py-10 font-bold text-2xl">
                  Berikutnya <p></p> lagi menuju{' '}
                  <strong>{indonesianName(next.name)}</strong>
                </p> */}
                </div>
              </>
            )}

            {/* Looping jadwal sholat */}
            {jadwalSholat.timings && (
              <div className="pb-20 px-[5%] lg:pt-[7%] md:pt-[7%] sm:pt-44 pt-44 flex flex-col space-y-5">
                {/* <div className="pb-20 px-[7%] lg:pt-[16%] md:pt-[16%] sm:pt-44 pt-44 flex flex-col space-y-5"> */}
                <div className="flex space-x-2 items-center p-5 bg-gray-300 opacity-80 max-w-2xl rounded-lg mt-64">
                  {/* <button onClick={play}>Boop!</button> */}
                  <p className="lg:text-3xl md:text-3xl sm:text-lg text-lg font-bold">
                    Menuju
                  </p>
                  <p className="lg:text-5xl md:text-5xl sm:text-lg text-lg font-black text-black">
                    {indonesianName(next.name)}
                  </p>
                  <p className="lg:text-5xl md:text-5xl sm:text-lg text-lg font-bold">
                    {' '}
                    -{next.countDown}
                  </p>
                </div>

                <div className="grid lg:grid-cols-7 md:grid-cols-7 sm:grid-cols-1 grid-cols-1 gap-3">
                  {/* {Object.keys(jadwalSholat.timings).map((key, index) => (
                <JadwalSholatCard
                  key={index}
                  sholat={{
                    name: indonesianName(key),
                    time: jadwalSholat.timings[key],
                    active: next.name === key ? true : false,
                  }}
                />
              ))} */}
                  {/* <div className="flex">
                <div className="p-10">
                  <p>Imsak</p>
                  {jadwalSholat.timings.Imsak}
                </div>
                <div className="p-10">
                  <p>Subuh</p>
                  {jadwalSholat.timings.Fajr}
                </div>
                <div className="p-10">
                  <p>Isyraq</p>
                  {jadwalSholat.timings.Sunrise}
                </div>
                <div className="p-10">
                  <p>Zuhur</p>
                  {jadwalSholat.timings.Dhuhr}
                </div>
                <div className="p-10">
                  <p>Ashar</p>
                  {jadwalSholat.timings.Asr}
                </div>
                <div className="p-10">
                  <p>Maghrib</p>
                  {jadwalSholat.timings.Maghrib}
                </div>
                <div className="p-10">
                  <p>Isha</p>
                  {jadwalSholat.timings.Isha}
                </div> */}
                  <LimaWaktuShalat
                    title={'Imsak'}
                    value={jadwalSholat.timings.Imsak}
                    variant={'bg-imsak'}
                  />
                  <LimaWaktuShalat
                    title={'Subuh'}
                    value={jadwalSholat.timings.Fajr}
                    variant={'bg-subuh'}
                  />
                  <LimaWaktuShalat
                    title={'Syuruq'}
                    value={jadwalSholat.timings.Sunrise}
                    variant={'bg-isyraq'}
                  />
                  <LimaWaktuShalat
                    title={'Dzuhur'}
                    value={jadwalSholat.timings.Dhuhr}
                    variant={'bg-dzuhur'}
                  />
                  <LimaWaktuShalat
                    title={'Ashar'}
                    value={jadwalSholat.timings.Asr}
                    variant={'bg-ashar'}
                  />
                  <LimaWaktuShalat
                    title={'Maghrib'}
                    value={jadwalSholat.timings.Maghrib}
                    variant={'bg-maghrib'}
                  />
                  <LimaWaktuShalat
                    title={"Isya'"}
                    value={jadwalSholat.timings.Isha}
                    variant={'bg-isya'}
                  />
                  {/* </div> */}
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-10 justify-center">
                  <div className="p-5 flex flex-row justify-center bg-white rounded-lg space-x-3">
                    {/* <div className="flex items-start">
                      <Image
                        src={BarcodeInfaq}
                        height={100}
                        alt="barcode-infaq"
                      />
                    </div> */}
                    <div>
                      <h1 className="font-black text-2xl">INFAK</h1>
                      <div className="flex space-x-2">
                        <Image
                          src={logoBSI}
                          height={62}
                          // width={80}
                          alt="logo-BSI"
                        />
                        <div>
                          <p className="font-black text-2xl">300-4000-888</p>
                          <p className="font-medium text-xl">
                            Kode Bank BSI: <b>451</b>
                          </p>
                        </div>
                      </div>
                      <h1 className="text-xl font-medium">
                        a.n Masjid Al-Barokah PBCVR (infak)
                      </h1>
                    </div>
                  </div>
                  <div className="p-5 flex flex-row justify-center bg-white rounded-lg space-x-3">
                    {/* <div className="flex items-start">
                      <Image
                        src={BarcodeWakaf}
                        height={100}
                        alt="barcode-wakaf"
                      />
                    </div> */}
                    <div>
                      <h1 className="font-black text-2xl">WAKAF</h1>
                      <div className="flex space-x-2">
                        <Image
                          src={logoBSI}
                          height={62}
                          // width={80}
                          alt="logo-BSI"
                        />
                        <div>
                          <p className="font-black text-2xl">300-4000-567</p>
                          <p className="font-medium text-xl">
                            Kode Bank BSI: <b>451</b>
                          </p>
                        </div>
                      </div>
                      <h1 className="text-xl font-medium">
                        a.n Masjid Al-Barokah PBCVR (wakaf)
                      </h1>
                    </div>
                  </div>
                  <div className="p-5 flex flex-row justify-center bg-white rounded-lg space-x-3">
                    {/* <div className="flex items-start">
                      <Image
                        src={BarcodeZakat}
                        height={100}
                        alt="barcode-zakat"
                      />
                    </div> */}
                    <div>
                      <h1 className="font-black text-2xl">ZAKAT</h1>
                      <div className="flex space-x-2">
                        <Image
                          src={logoBSI}
                          height={62}
                          // width={80}
                          alt="logo-BSI"
                        />
                        <div>
                          <p className="font-black text-2xl">300-4000-667</p>
                          <p className="font-medium text-xl">
                            Kode Bank BSI: <b>451</b>
                          </p>
                        </div>
                      </div>
                      <h1 className="text-xl font-medium">
                        a.n Masjid Al-Barokah PBCVR (zakat)
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <audio
          id="adzan"
          controls
          src="/adzan.mp3"
          className="hidden"
          // loading="lazy"
          preload="none"
        />
        <audio
          id="short"
          controls
          src="/short.mp3"
          className="hidden"
          // loading="lazy"
          preload="none"
        />
        {/* <BottomNavigation /> */}
        <RunningText />
        {/* </FullScreen> */}
      </div>
    </Layout>
  )
}
