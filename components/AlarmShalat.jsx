import React from 'react'

const AlarmShalat = React.forwardRef((_, ref) => {
  return (
    <audio ref={ref}>
      <source src="/long-beep.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  )
})

export default React.memo(AlarmShalat)
