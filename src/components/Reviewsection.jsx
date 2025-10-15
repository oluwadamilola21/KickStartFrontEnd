import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import rev1 from '../assets/Images/kemi.jpeg'
import rev2 from '../assets/Images/bernard.jpeg'
import rev3 from '../assets/Images/dide.jpeg'
import rev4 from '../assets/Images/temi.jpeg'
import rev5 from '../assets/Images/simi.jpeg'
import rev6 from '../assets/Images/dammie.webp'

const reviews = [
  {
    id: 1,
    name: 'Bello Oluwakemi',
    role: 'Content Writer',
    img: rev1,
    text: `I studied Marketing and previously worked as a Sales Representative in a travel company. For a long time, I believed tech was reserved for a specific group of people mostly men and never saw myself belonging in that space. However, joining Kickstart Digital Hub completely changed my perspective. What once felt like an intimidating mountain became a clear and accessible path. I was trained, guided, and empowered until I became confident in my abilities.Today, I’m proud to say I am in tech, When tech conversations come up, I don’t stand on the sidelines. I contribute because I’m actively in the field.`
  },
  {
    id: 2,
    name: 'Olorunfemi Bernard',
    role: 'Automation Engineer',
    img: rev2,
    text: `It’s incredible to think that someone who once worked as a factory housekeeper completely unfamiliar with computers is now an Automation Engineer.
      Just a few years ago, I could barely navigate a PC. The first time I held a mouse, I fumbled like a toddler learning to write. Watching others glide effortlessly across the screen felt like witnessing magic.
      Fast forward to today: the mouse is now my tool of precision, and the computer is my workspace. I’ve gone from confusion to competence through Kickstart Digital Hub. To say that a factory housekeeper is now an automation engineer is a wonder. Thank you Kickstart Digital Hub.`,
  },
  {
    id: 3,
    name: 'Ajayi Dideoluwa',
    role: 'UI/UX Designer',
    img: rev3,
    text: `Before joining Kickstart, I had little interest in tech, but the environment completely changed my mindset. I was introduced to basic digital skills like typing, using Google tools, and virtual assistance, and I realized tech isn’t as difficult as I once thought. Today, I’m confident in my abilities and can proudly consider myself a professional in the tech space.
      With dedication, anyone can grow in tech. I’m glad to be on this journey and to be part of Kickstart.
      `
  },

  {
    id: 4,
    name: 'Afolayan Temitope',
    role: 'Data Entry Specialist',
    img: rev4,
    text: `I’m a business owner who once believed tech had nothing to do with me. I didn’t understand how it could impact my business in fact, I didn’t even think it was necessary.
    That changed when a friend told me I could learn tech without abandoning my business. That reassurance led me to Kickstart Digital Hub. At first, I was skeptical about learning at my own pace, but Kickstart never gave up on me, i learnt at my pace.
    Today, I proudly call myself a Data Entry Specialist ,I type with confidence, understand digital tools, and still successfully run my business with my tech knowledeg.
    Thanks to Kickstart, I didn’t just learn tech,I became part of it.`
  },
  {
    id: 5,
    name: 'Adewaga Similoluwa',
    role: 'Content Writer',
    img: rev5,
    text: `My first real computer experience was learning to use a mouse. I was nervous, but with guidance, I quickly realized tech wasn’t as hard as I imagined. 
          Joining Kickstart Digital Hub, it changed my perspective completely. I’ve gained practical digital skills, handled tech-related tasks, and grown into content creation and writing. 
        Today, I’m confident in my abilities and proud to be building a career in tech is a proof that women can excel in this field. - `,
  },
  {
    id: 6,
    name: 'Ayodele Oluwadamilola',
    role: 'Front End Developer',
    img: rev6,
    text: `“How I Found My Way Back to Tech” I made a decision: to return. Coming back wasn’t easy. I had to brush up on everything again. It felt like learning how to walk twice. But the difference this time? I wasn’t just curious — I was committed. Now, I’m back in the game — learning, building, pushing through, and reminding myself why I started in the first place. This time, I’m not turning back. Because sometimes, detours don’t mean the dream is dead — they just mean the story got a little more interesting. All things didn't just happen, it's a big thanks to Kick-Start Digitals`,
  },

]

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* 5-Star Rating */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4">
        <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover"/>
        <div>
          <p className="font-semibold text-gray-900">{review.name}</p>
          <p className="text-sm text-gray-500">{review.role}</p>
        </div>
      </div>

      {/* Review Text */}
      <AnimatePresence initial={false}>
        <motion.p
          key={expanded ? 'expanded' : 'collapsed'}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-700 text-sm overflow-hidden"
        >
          {expanded
            ? review.text
            : review.text.length > 120
              ? review.text.slice(0, 120) + '...'
              : review.text}
        </motion.p>
      </AnimatePresence>

      {/* Read More Toggle */}
      <button onClick={() => setExpanded(!expanded)} className="text-blue-600 text-sm font-semibold mt-2 hover:underline self-start"> {expanded ? 'Read Less' : 'Read More'}
      </button>
    </motion.div>
  )
}

const ReviewSection = () => {
  return (
    <section className="py-24 bg-gray-50 text-gray-800 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Reviews
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewSection
