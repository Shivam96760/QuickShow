import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { StarIcon } from 'lucide-react'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard' // ✅ FIXED

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [show, setShow] = useState(null)

  const getShow = () => {
    const foundShow = dummyShowsData.find(
      (item) => item._id === id
    )

    if (foundShow) { // ✅ FIXED
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      
      {/* TOP SECTION */}
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

        <img 
          src={show.movie.poster_path} 
          alt="" 
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
        />

        <div className='relative flex flex-col gap-3'> 
          <BlurCircle top="-100px" left="-100px"/>

          <p className='text-primary'>ENGLISH</p>

          <h1 className='text-4xl font-semibold max-w-96'>
            {show.movie.title}
          </h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className="w-5 h-5 text-primary fill-primary"/>
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm max-w-xl'>
            {show.movie.overview}
          </p> 

          <p>
            {show.movie.runtime} min •{" "}
            {show.movie.genres.map(g => g.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className='flex gap-4 mt-4'>
            <button className='px-6 py-2 bg-gray-800 rounded'>
              Watch Trailer
            </button>

            <button
              onClick={() => {
                document.getElementById('dateSelect')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className='px-6 py-2 bg-primary rounded'
            >
              Buy Tickets
            </button>
          </div>
        </div>
      </div>

      {/* CAST */}
      <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>

      <div className='overflow-x-auto mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <img
                src={cast.profile_path}
                alt=''
                className='rounded-full h-20 aspect-square object-cover'
              />
              <p>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DATE SELECT */}
      <DateSelect dateTime={show.dateTime} id={id} />

      {/* MORE MOVIES */}
      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>

      <div className='flex flex-wrap gap-8'>
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20'>
        <button
          onClick={() => {
            navigate('/movies')
            window.scrollTo(0, 0) // ✅ FIXED
          }}
          className='px-10 py-3 text-sm bg-primary rounded-md'
        >
          Show more
        </button>
      </div>

    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default MovieDetails