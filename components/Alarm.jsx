import React from 'react'

const Alarm = React.forwardRef((_, ref) => {
  return (
    <audio ref={ref}>
      <source src="/alarm-beep-beep.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  )
})

export default React.memo(Alarm)
