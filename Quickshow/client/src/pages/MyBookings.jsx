import React from 'react'
import { useLocation } from 'react-router-dom'
import isoTimeFormat from '../lib/isoTimeFormat'

const MyBookings = () => {
  const { state } = useLocation()

  if (!state) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>No bookings yet</p>
      </div>
    )
  }

  const { movie, seats, time, date } = state

  return (
    <div className='px-6 md:px-16 lg:px-40 py-20'>

      <h1 className='text-2xl font-semibold mb-8'>My Bookings</h1>

      <div className='bg-primary/10 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row gap-6'>

        {/* MOVIE POSTER */}
        <img
          src={movie.poster_path}
          alt=""
          className='w-40 rounded-lg object-cover'
        />

        {/* DETAILS */}
        <div className='flex flex-col justify-between'>

          <div>
            <h2 className='text-xl font-semibold'>{movie.title}</h2>

            <p className='text-gray-400 mt-2'>
              {movie.genres.map(g => g.name).join(", ")}
            </p>

            <p className='mt-2'>
              <b>Date:</b> {date}
            </p>

            <p>
              <b>Time:</b> {isoTimeFormat(time)}
            </p>

            <p>
              <b>Seats:</b> {seats.join(", ")}
            </p>
          </div>

          {/* PRICE */}
          <div className='mt-4 text-primary font-semibold'>
            Total: ₹{seats.length * 200}
          </div>

        </div>
      </div>

    </div>
  )
}

export default MyBookings 