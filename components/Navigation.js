import React from 'react'
import { FiClock, FiSettings } from 'react-icons/fi'

function Navigation({ setOpenSetting }) {
  return (
    <nav className="pt-5 text-white flex items-center justify-between w-11/12 mx-auto">
      <div className="flex items-center gap-1 cursor-pointer">
        {/* <FiClock className="text-2xl " /> */}
        {/* <h1 className="text-2xl font-bold">Waktu Iqomah</h1> */}
      </div>
      {/* <FiSettings
        className="text-2xl cursor-pointer "
        onClick={() => setOpenSetting((value) => !value)}
      /> */}
    </nav>
  )
}
export default React.memo(Navigation)
