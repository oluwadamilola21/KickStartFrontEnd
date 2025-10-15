import React from 'react'
import { motion } from 'framer-motion'

import img1 from '../assets/Images/pic1.webp'
import img2 from '../assets/Images/pic2.webp'
import img3 from '../assets/Images/pic3.webp'
import img4 from '../assets/Images/pic4.webp'

const images = [img1, img2, img3, img4]

const Aboutsection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">

        {/* Left - Graphic Collage */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl ${
                index % 2 !== 0 ? 'mt-3 sm:mt-4 md:mt-8' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <img src={img} alt={`Graphic ${index + 1}`} className="w-full h-36 sm:h-44 md:h-56 lg:h-60 object-cover transition-transform duration-500 group-hover:scale-105"/>
            </motion.div>
          ))}
        </motion.div>

        {/* Right - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg font-montserrat"
        >
          <p className="leading-relaxed text-gray-700">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold float-left leading-none mr-2 sm:mr-3 text-blue-700 border-b-4 border-yellow-400 pr-1">
              K
            </span>ickstart is a hub for tech training, mentorship, and IT consulting. We transform beginners into experts by delivering practical, hands-on learning experiences, industry-relevant skills, and continuous guidance.
          </p>

          <p className="leading-relaxed text-gray-700">
            Our programs also upskill professionals to stay ahead in the fast-changing digital world. We support businesses with tailored technology solutions that boost efficiency and performance — empowering individuals, teams, and organizations to grow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Aboutsection
