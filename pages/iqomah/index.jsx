import { useEffect, useState, useRef } from 'react'

export default function Iqomah() {
  //   const [partyTime, setPartyTime] = useState(false)
  //   const [days, setDays] = useState(0)
  //   const [hours, setHours] = useState(0)
  //   const [minutes, setMinutes] = useState(0)
  //   const [seconds, setSeconds] = useState(0)

  //   useEffect(() => {
  //     const target = new Date('05/14/2023 15:00:00')
  //     console.log(target)

  //     const interval = setInterval(() => {
  //       const now = new Date()
  //       const difference = target.getTime() - now.getTime()

  //       const d = Math.floor(difference / (1000 * 60 * 60 * 24))
  //       setDays(d)

  //       const h = Math.floor(
  //         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       )
  //       setHours(h)

  //       const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  //       setMinutes(m)

  //       const s = Math.floor((difference % (1000 * 60)) / 1000)
  //       setSeconds(s)

  //       if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
  //         setPartyTime(true)
  //       }
  //     }, 1000)

  //     return () => clearInterval(interval)
  //   }, [])

  //   return (
  //     <div>
  //       {partyTime ? (
  //         <>
  //           <h1>Iqomah Selesai</h1>
  //           {/* <video autoPlay loop muted>
  //             <source src="/party.mp4" />
  //           </video> */}
  //         </>
  //       ) : (
  //         <>
  //           <div className="text-right">
  //             <p className="font-black text-7xl">DAYS{days}</p>
  //           </div>
  //           <div className="text-right">
  //             <p className="font-black text-7xl">HOURS{hours}</p>
  //           </div>
  //           <div className="text-right">
  //             <p className="font-black text-7xl">MINUTE{minutes}</p>
  //           </div>
  //           <div className="text-right">
  //             <p className="font-black text-7xl">SECONDS{seconds}</p>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   )
  // }

  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null)

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00')
  const [text, setText] = useState('')

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      hours,
      minutes,
      seconds,
    }
  }

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e)
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:10')

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current)
    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setMinutes(deadline.getMinutes() + 2)
    return deadline
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime())
    if (timer === '00:01:50') {
      setText('Iqomah Selesai')
    }
  }, [])

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime())
  }

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <p className="text-[20rem] font-bold">{timer}</p>
      <p className="text-lg font-bold">{text}</p>

      <button onClick={onClickReset}>Reset</button>
    </div>
  )
}
