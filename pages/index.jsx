import { useEffect, useState } from 'react'
import ErrorCard from '../components/ErrorCards'
import JadwalSholatCard from '../components/JadwalSholatCard'
import Layout from '../components/Layouts'
import Loading from '../components/Loading'
import Tracker from '../components/Tracker'
import { coords } from '../constants/location'
import { indonesianDate, indonesianName } from '../utils/jadwal-sholat'
import LimaWaktuShalat from '../components/LimaWaktuShalat'

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

  const [today, setToday] = useState(Number(dd))
  const [tanggal, setTanggal] = useState(indonesianDate())
  const [jam, setJam] = useState(indonesianDate(true))
  const [next, setNext] = useState({ name: '-', countDown: 0 })

  // Fetch jadwal sholat
  useEffect(() => {
    // Query string
    const query = new URLSearchParams({
      ...coordinates,
      method: 15,
      tune: '0,0,0,2,2,6,0,-3,-3',
    })
    const apiURL = `https://api.aladhan.com/v1/timings/${today}-${mm}-${yyyy}?${query}`

    setLoading(true)
    fetch(apiURL)
      .then((res) => res.json())
      .then(({ data }) => {
        delete data.timings['Sunset'] // Menghapus waktu sunset, karna Sunset === Maghrib
        // console.log(data.timings['Sunset'])
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
    switch (name) {
      case 'Fajr':
      case 'Dhuhr':
      case 'Asr':
      case 'Maghrib':
      case 'Isha':
        if (countDown === '00:00:00') adzan.play()
        break

      default:
        break
    }
  })

  return (
    <Layout name="Jadwal Sholat">
      {loading && <Loading message="Memuat jadwal sholat..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      <div
        className={`fixed inset-0 p-3 bg-white duration-300 ${
          displayMap ? 'visible' : 'invisible'
        }`}
      >
        <h2 className="text-lg font-bold text-sky-500">Atur Lokasi</h2>
        <p>Silakan klik lokasi pada map untuk mengganti lokasi.</p>

        <Tracker callback={(coords) => setCoordinates(coords)} />

        <button
          onClick={() => setDisplayMap(!displayMap)}
          className="px-3 py-2 rounded-lg bg-sky-500 text-white"
        >
          Simpan
        </button>
      </div>

      {jadwalSholat && (
        <>
          {jadwalSholat.date && (
            <>
              {/* MAIN JAM */}
              <div>
                <h1 className="text-3xl font-bold">
                  Jadwal Sholat Masjid Al-Barokah
                </h1>
                <p className="font-medium">Pesona Bali City View Residence</p>
                <p className="flex items-center font-black text-7xl py-10">
                  {jam}
                </p>
                <div className="flex items-center space-x-5">
                  <p className="flex items-center font-semibold text-3xl">
                    {tanggal}
                  </p>
                  <button
                    onClick={() => setDisplayMap(!displayMap)}
                    className=" h-6 w-auto px-2 rounded-lg bg-sky-500 text-white"
                    title="Klik untuk mengatur lokasi sesuai keinginan"
                  >
                    Update lokasi
                  </button>
                </div>
                <p className="flex items-center font-medium text-2xl">
                  {jadwalSholat.date.hijri.day}{' '}
                  {jadwalSholat.date.hijri.month.en}{' '}
                  {jadwalSholat.date.hijri.year}
                </p>
              </div>
              {/* AKHIR MAIN JAM */}

              {/* <p>Berikut jadwal sholat hari ini.</p> */}

              <div className="flex space-x-2 py-10">
                {/* TIMEZONE */}
                {/* <p className="flex items-center mt-3">
                  {jadwalSholat.meta.timezone}
                </p> */}
                {/* AKHIR TIMEZONE */}
                <div className="flex space-x-2 items-center">
                  <p className="text-2xl">Berikutnya</p>
                  <p className="text-2xl font-bold">{next.countDown}</p>
                </div>
                <div>
                  <p className="text-2xl">menuju </p>
                  <p className="text-2xl font-bold">
                    {indonesianName(next.name)}
                  </p>
                </div>
              </div>

              {/* <p className="py-10 font-bold text-2xl">
                  Berikutnya <p></p> lagi menuju{' '}
                  <strong>{indonesianName(next.name)}</strong>
                </p> */}
            </>
          )}

          {/* Looping jadwal sholat */}
          {jadwalSholat.timings && (
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
              />
              <LimaWaktuShalat
                title={'Subuh'}
                value={jadwalSholat.timings.Fajr}
              />
              <LimaWaktuShalat
                title={'Isyraq'}
                value={jadwalSholat.timings.Sunrise}
              />
              <LimaWaktuShalat
                title={'Dzuhur'}
                value={jadwalSholat.timings.Dhuhr}
              />
              <LimaWaktuShalat
                title={'Ashar'}
                value={jadwalSholat.timings.Asr}
              />
              <LimaWaktuShalat
                title={'Maghrib'}
                value={jadwalSholat.timings.Maghrib}
              />
              <LimaWaktuShalat
                title={"Isya'"}
                value={jadwalSholat.timings.Isha}
              />
              {/* </div> */}
            </div>
          )}
        </>
      )}

      <audio
        id="adzan"
        controls
        src="/adzan.mp3"
        className="hidden"
        loading="lazy"
      />
    </Layout>
  )
}
