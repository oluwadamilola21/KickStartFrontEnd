import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">

        {/* Brand / Info */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl font-bold">Kick-Start Digital Hub</h2>
          <p className="text-sm text-white/70">Empowering aspiring tech professionals!!!</p>
          <p className="text-sm text-white/70">Have Questions? We are here to help you</p>
          <p className="text-sm text-white/70">Email us at: kickstartdigital@gmail.com</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/share/1F5DuPX3Lh/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaFacebookF size={24} />
          </a>
          <a href="https://x.com/Kick_StartHub?t=dW8M6isA-rOELK7UZ0iPmg&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter size={24} />
          </a>
          <a href="http://tiktok.com/@kickstart.digital8" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition">
            <SiTiktok size={24} />
          </a>
          <a href="https://www.instagram.com/kickstartdigitalhub?igsh=NnF2em5vcHB2YWFp" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-white/50 text-sm">
        &copy; {new Date().getFullYear()} Kick-Start Digital Hub. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
