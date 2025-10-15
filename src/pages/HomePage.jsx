import React from 'react'
import Hero from '../components/Hero'
import Aboutsection from '../components/Aboutsection'
import ReviewSection from '../components/Reviewsection'
import Footer from '../components/Footer'
const HomePage = () => {
  return (
    < >
      <Hero />
      <div className="overflow-x-hidden">
        <Aboutsection />
      </div>
      <ReviewSection />
      <Footer />
    </>
  )
}

export default HomePage