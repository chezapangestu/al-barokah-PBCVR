import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Alarm from '../../components/Alarm'
import Timer from '../../components/Timer'
import ModalSetting from '../../components/ModalSetting'
import Navigation from '../../components/Navigation'

export default function IqomahIsya() {
  const [pomodoro, setPomodoro] = useState(6)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(7)
  const [seconds, setSecond] = useState(0)
  const [stage, setStage] = useState(0)
  const [consumedSecond, setConsumedSecond] = useState(0)
  const [ticking, setTicking] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)

  const router = useRouter()

  const alarmRef = useRef()
  const pomodoroRef = useRef()
  const shortBreakRef = useRef()
  const longBreakRef = useRef()

  const updateTimeDefaultValue = () => {
    setPomodoro(pomodoroRef.current.value)
    setShortBreak(shortBreakRef.current.value)
    setLongBreak(longBreakRef.current.value)
    setOpenSetting(false)
    setSecond(0)
    setConsumedSecond(0)
  }

  const switchStage = (index) => {
    const isYes =
      consumedSecond && stage !== index
        ? confirm('Are you sure you want to switch?')
        : false
    if (isYes) {
      reset()
      setStage(index)
    } else if (!consumedSecond) {
      setStage(index)
    }
  }

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    }
    return timeStage[stage]
  }
  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    }
    return updateStage[stage]
  }

  const reset = () => {
    setConsumedSecond(0)
    setTicking(false)
    setSecond(0)
    updateTimeDefaultValue()
  }

  const timeUp = () => {
    reset()
    setIsTimeUp(true)
    alarmRef.current.play()
  }

  const clockTicking = () => {
    const minutes = getTickingTime()
    const setMinutes = updateMinute()

    if (minutes === 0 && seconds === 1) {
      router.push('waktushalat')
      // timeUp()
      // setTimeout(() => {
      //   router.push('waktushalat')
      // }, 10000)
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1)
      setSecond(59)
    } else {
      setSecond((second) => second - 1)
    }
  }
  const muteAlarm = () => {
    alarmRef.current.pause()
    alarmRef.current.currentTime = 0
  }

  const startTimer = () => {
    setIsTimeUp(false)
    muteAlarm()
    setTicking((ticking) => !ticking)
  }

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? 'Show waring' : null
    }

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1)
        clockTicking()
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [seconds, pomodoro, shortBreak, longBreak, ticking])
  return (
    <div className="bg-gray-900 min-h-screen font-inter">
      <div className="max-w-2xl min-h-screen mx-auto">
        <Navigation setOpenSetting={setOpenSetting} />
        <h1 className="text-center font-bold text-white text-5xl pt-10">
          Waktu Iqomah Isya
        </h1>
        <Timer
          stage={stage}
          switchStage={switchStage}
          getTickingTime={getTickingTime}
          seconds={seconds}
          ticking={ticking}
          startTimer={startTimer}
          muteAlarm={muteAlarm}
          isTimeUp={isTimeUp}
          reset={reset}
        />
        {/* <About /> */}
        <Alarm ref={alarmRef} />
        <ModalSetting
          openSetting={openSetting}
          setOpenSetting={setOpenSetting}
          pomodoroRef={pomodoroRef}
          shortBreakRef={shortBreakRef}
          longBreakRef={longBreakRef}
          updateTimeDefaultValue={updateTimeDefaultValue}
        />
      </div>
    </div>
  )
}
