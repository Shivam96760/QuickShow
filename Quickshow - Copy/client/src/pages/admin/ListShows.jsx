
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import { dateFormat } from "../../lib/timeFormat"
import { useAppContext } from "../../context/AppContext"
import { dummyShowsData } from '../../assets/assets'

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY || "₹"
  const { user } = useAppContext()

  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setShows(dummyShowsData || [])
      setLoading(false)
    }
  }, [user])

  return loading ? <Loading /> : (
    <>
      <Title text1="List" text2="Shows" />

      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr>
              <th>Movie</th>
              <th>Time</th>
              <th>Bookings</th>
              <th>Earnings</th>
            </tr>
          </thead>

          <tbody>
            {shows?.length > 0 ? (
              shows.map((show, i) => (
                <tr key={i}>
                  <td>{show.movie?.title || "N/A"}</td>
                  <td>{dateFormat(show.showDateTime || new Date())}</td>
                  <td>{Object.keys(show.occupiedSeats || {}).length}</td>
                  <td>
                    {currency} {Object.keys(show.occupiedSeats || {}).length * (show.showPrice || 0)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Shows</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </>
  )
}

export default ListShows




