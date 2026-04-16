import React from 'react'
import { useLocation } from 'react-router-dom'
import isoTimeFormat from '../lib/isoTimeFormat'

const Checkout = () => {
  const { state } = useLocation()

  if (!state) return <div>No Data</div>

  return (
    <div className='p-10 text-white'>
      <h1 className='text-2xl mb-4'>Checkout</h1>

      <p><b>Movie:</b> {state.movie.title}</p>
      <p><b>Date:</b> {state.date}</p>
      <p><b>Time:</b> {isoTimeFormat(state.time)}</p>
      <p><b>Seats:</b> {state.seats.join(", ")}</p>

      <p className='mt-4 text-primary'>
        Total: ₹{state.seats.length * 200}
      </p>
    </div>
  )
}

export default Checkout 