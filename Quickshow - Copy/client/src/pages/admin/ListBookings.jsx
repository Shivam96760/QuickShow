
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from "../../components/Title"
import { dateFormat } from "../../lib/timeFormat"
import { useAppContext } from '../../context/AppContext'
import { dummyBookingData } from '../../assets/assets'

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY || "₹"
  const { user } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setBookings(dummyBookingData || [])
      setLoading(false)
    }
  }, [user])

  return loading ? <Loading /> : (
    <>
      <Title text1="List" text2="Bookings" />

      <table className="w-full mt-6">

        <thead>
          <tr>
            <th>User</th>
            <th>Movie</th>
            <th>Time</th>
            <th>Seats</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {bookings?.length > 0 ? (
            bookings.map((item, i) => (
              <tr key={i}>
                <td>{item.user?.name || "N/A"}</td>
                <td>{item.show?.movie?.title || "N/A"}</td>
                <td>{dateFormat(item.show?.showDateTime || new Date())}</td>
                <td>{Object.values(item.bookedSeats || {}).join(", ")}</td>
                <td>{currency} {item.amount || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Bookings</td>
            </tr>
          )}
        </tbody>

      </table>
    </>
  )
}

export default ListBookings



