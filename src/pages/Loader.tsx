import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import "react-loader-spinner"

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="font-bold text-3xl -mt-20 mb-6 text-cyan-900">DSPLAY</h1>
      <TailSpin
        height="80"
        width="80"
        color="#164E63"
        aria-label="tail-spin-loading"
        radius="1"

      />
        </div>
  )
}

export default Loader