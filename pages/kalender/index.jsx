import { useEffect, useState } from 'react'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'
import { coords } from '../../constants/location'
import { indonesianDate } from '../../utils/jadwal-sholat'

export default function Kalender() {
  const [coordinates, setCoordinates] = useState({
    latitude: coords.lat,
    longitude: coords.lng,
  })
  const [calendar, setCalendar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [local, setLocal] = useState(true)

  const d = new Date()

  // Fetch data
  useEffect(() => {
    if (localStorage.getItem('coords')) {
      setLocal(!local)

      if (local) {
        const { lat, lng } = JSON.parse(localStorage.getItem('coords'))
        setCoordinates({
          latitude: lat,
          longitude: lng,
        })
      }
    }

    // Query string
    const query = new URLSearchParams({
      ...coordinates,
      method: 15,
      tune: '0,0,0,2,2,6,0,-3,-3',
    })

    console.log(`${query}`)

    setLoading(true)
    fetch(`https://api.aladhan.com/v1/calendar?${query}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setCalendar(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [coordinates])

  return (
    <Layout name="Kalender">
      <h1 className="text-3xl px-[7%] py-10 font-bold text-main-500 mb-3">
        Kalender
      </h1>

      <div className="text-center mb-3">
        <p className="text-2xl font-semibold">
          Hari ini <strong>{indonesianDate()}</strong>
        </p>
        <p className="font-medium">
          Berikut ini kalender sholat khusus bulan <strong>ini</strong> tahun{' '}
          <strong>{d.getFullYear()}</strong>
        </p>
      </div>

      {loading && <Loading message="Memuat kalender..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      {calendar && (
        <div className="overflow-x-auto mx-auto max-w-max">
          <table className="table-fixed">
            <thead>
              <tr className="divide-x text-main-500">
                <th className="p-3">Tanggal</th>
                {Object.keys(calendar[0].timings).map((name) => (
                  <th className="p-3">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendar.map(({ timings, date }, i) => (
                <tr
                  key={i}
                  className={`font-semibold whitespace-nowrap ${
                    date.gregorian.day === String(d.getDate()).padStart(2, '0')
                      ? 'bg-main-400 text-white'
                      : 'odd:bg-main-100'
                  }`}
                >
                  <td className="p-3">
                    {date.gregorian.day}/{date.gregorian.month.number}/
                    {date.gregorian.year}
                  </td>
                  {Object.values(timings).map((time, i) => (
                    <td className="p-3" key={i}>
                      {time.slice(0, 5)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}
