import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Loading from '../../components/Loading'
import { dummyShowsData, dummyBookingData } from '../../assets/assets'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [shows, setShows] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      // dummy data (same pattern as your files)
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3"
          }
        }
      ])

      setBookings(dummyBookingData)

      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Calculations
  const totalShows = shows.length

  const totalBookings = shows.reduce(
    (acc, show) => acc + Object.keys(show.occupiedSeats).length,
    0
  )

  const totalEarnings = shows.reduce(
    (acc, show) =>
      acc + Object.keys(show.occupiedSeats).length * show.showPrice,
    0
  )

  return loading ? (
    <Loading />
  ) : (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

        {/* Total Shows */}
        <div className="bg-primary/10 p-6 rounded-lg">
          <p className="text-gray-400">Total Shows</p>
          <h2 className="text-2xl font-bold mt-2">{totalShows}</h2>
        </div>

        {/* Total Bookings */}
        <div className="bg-primary/10 p-6 rounded-lg">
          <p className="text-gray-400">Total Bookings</p>
          <h2 className="text-2xl font-bold mt-2">{totalBookings}</h2>
        </div>

        {/* Total Earnings */}
        <div className="bg-primary/10 p-6 rounded-lg">
          <p className="text-gray-400">Total Earnings</p>
          <h2 className="text-2xl font-bold mt-2">
            {currency} {totalEarnings}
          </h2>
        </div>

      </div>
    </>
  )
}

export default Dashboard 