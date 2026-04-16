import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData, assets } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import { toast } from 'react-hot-toast'

const SeatLayout = () => {
  const { id, date } = useParams()
  const navigate = useNavigate()

  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const getShow = () => {
    const foundShow = dummyShowsData.find(
      (item) => item._id === id
    )

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  const rows = ["A","B","C","D","E","F","G","H","I","J"]
  const cols = 9

  const handleSeatClick = (seat) => {
    if (!selectedTime) {
      return toast("Select time first")
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat))
    } else {
      if (selectedSeats.length >= 5) {
        return toast("Max 5 seats allowed")
      }
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  return show ? (
    <div className='flex flex-col md:flex-row px-6 lg:px-40 py-30 md:pt-50'>

      {/* LEFT */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10'>
        
        <p className='text-lg font-semibold px-6'>Selected Date</p>

        <div className='px-6 mt-2 text-center'>
          <p className='text-xl font-bold'>
            {new Date(date).getDate()}
          </p>
          <p className='text-sm text-gray-400'>
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric"
            })}
          </p>
        </div>

        <p className='px-6 mt-4'>Available Timings</p>

        <div className='mt-3 space-y-1'>
          {show.dateTime[date]?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTime(item.time)
                setSelectedSeats([])
              }}
              className={`px-6 py-2 cursor-pointer ${
                selectedTime === item.time
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              <ClockIcon className='inline w-4 mr-2' />
              {isoTimeFormat(item.time)}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className='flex-1 text-center'>
        <h1 className='text-2xl mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt="" />
        <p className='text-gray-400'>SCREEN SIDE</p>

        {/* SEATS */}
        <div className='mt-6'>
          {rows.map(row => (
            <div key={row} className='flex justify-center gap-2 mb-2'>
              {[...Array(cols)].map((_, i) => {
                const seat = `${row}${i+1}`
                return (
                  <button
                    key={seat}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-10 h-10 border ${
                      selectedSeats.includes(seat)
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {seat}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        {selectedSeats.length > 0 && (
          <button
            onClick={() => {
              if (!selectedTime) return toast("Select time")
              
              navigate('/checkout', {
                state: {
                  movie: show.movie,
                  seats: selectedSeats,
                  time: selectedTime,
                  date: date
                }
              })
            }}
            className='mt-6 bg-primary px-6 py-3 rounded'
          >
            Proceed to Checkout →
          </button>
        )}
      </div>

    </div>
  ) : <Loading />
}

export default SeatLayout  