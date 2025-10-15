import React from 'react'
import homeImg from '../assets/Images/Homepage1.webp'

const Hero = () => {
  const services = [
    'Cyber Security',
    'Content Writing',
    'Data Analysis',
    'Automation Eng.',
    'AI Mastery',
    'Data Entry',
    'Programming',
    'Video Editing',
    'UX/UI Design',
  ]

  return (
    <section
      className="relative bg-cover bg-center pt-16 sm:pt-20 min-h-[60vh] sm:min-h-screen"
      style={{
        backgroundImage: `url(${homeImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-full px-4 sm:px-6 md:px-12 pb-10 sm:pb-0">
        {/* Left Side */}
        <div className="flex flex-col justify-center w-full md:w-1/2 text-white space-y-4 sm:space-y-6 font-montserrat mt-8 md:mt-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-snug">
            <span className="font-semibold text-yellow-400 animate-slide-fade-in">
              Kick-Start
            </span>
            <p className="mt-2 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              Your Tech Career
            </p>
          </h1>

          <p className="text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
            <em> At Kick-Start Digital Hub, we help those looking to build a successful tech career get started with the right skills, guidance, and support.</em>
          </p>

          {/* Services*/}
          <div className="services mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service) => (
              <div key={service} className="px-3 sm:px-4 py-2 rounded bg-yellow-500 text-white hover:bg-cyan-600 transition text-center text-xs sm:text-sm md:text-base font-medium">
                {service}
              </div>
            ))}
          </div>
        </div>

        {/*empty side */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0"></div>
      </div>
    </section>
  )
}

export default Hero
