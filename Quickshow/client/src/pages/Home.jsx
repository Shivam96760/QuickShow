import React from 'react'
import Navbar from '../components/Navbar' 
import HeroSection from '../components/HeroSection' 
import FeaturedSection from '../components/FeaturedSection'
import TrailerSection from '../components/TrailerSection'
const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <TrailerSection/>

    </div>
  )
}

export default Home