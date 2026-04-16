import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailersSection = () => {

  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
  const [error, setError] = useState(null)
  const [playing, setPlaying] = useState(false)

  const handleError = (err) => {
    console.error('Video Player Error:', err)
    setError('Failed to load video')
  }

  const handleTrailerClick = (trailer) => {
    setCurrentTrailer(trailer)
    setPlaying(true)       // autoplay when clicked
    setError(null)         // reset error
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>

      {/* TITLE */}
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
        Trailers
      </p>

      {/* VIDEO PLAYER */}
      <div className='relative mt-6 flex justify-center w-full'>

        <div className='relative w-full max-w-5xl'>

          {/* Blur Background */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <BlurCircle />
          </div>

          {/* Player Wrapper */}
          <div
            className='relative w-full rounded-lg overflow-hidden bg-black'
            style={{ paddingBottom: '56.25%' }}
          >

            {error && (
              <div className='absolute inset-0 flex items-center justify-center bg-gray-900 text-red-500'>
                {error}
              </div>
            )}

            <div className="absolute inset-0">
  <iframe
    width="100%"
    height="100%"
    src={`https://www.youtube.com/embed/${currentTrailer.videoUrl}?autoplay=1`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full"
  ></iframe>
</div>

          </div>
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>

        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            onClick={() => handleTrailerClick(trailer)}
            className='relative group-hover:opacity-50 hover:!opacity-100 hover:-translate-y-1 duration-300 transition cursor-pointer'
          >

            <img
              src={trailer.image}
              alt="trailer"
              className='rounded-lg w-full h-full object-cover brightness-75'
            />

            {/* Play Icon */}
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />

          </div>
        ))}

      </div>

    </div>
  )
}

export default TrailersSection 