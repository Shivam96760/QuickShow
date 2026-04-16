import React from 'react'
const BlurCircle = ({ top, left, right, bottom }) => {
  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute w-40 h-40 bg-purple-500 opacity-30 blur-3xl rounded-full pointer-events-none"
    ></div>
  )
}
export default BlurCircle;

