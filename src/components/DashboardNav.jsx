import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/Images/Icon (1).jpg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Watch scroll position
 

  // Active link styling

  return (
    <nav className='top-0 left-0 w-full z-50 transition-colors duration-300 bg-blue-900 shadow-md'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img className="h-10 w-auto" src={Logo} alt="Kick-Start Logo" />
              <span className="font-montserrat text-white text-xl font-bold ml-2">
                Kick-Start Digital Hub
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 text-white font-savate">
            <NavLink to="/" className="text-white/50 hover:text-white">Home</NavLink>
            <NavLink to="/contact" className="text-white/50 hover:text-white" >Contact Us</NavLink>
            <NavLink to="/SignIn" className="text-white hover:text-white/50" >Sign In / Up</NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-400 focus:outline-none"aria-expanded={menuOpen}>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-1 pt-2 pb-3 bg-blue-900 font-savate">
            <NavLink to="/"  onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/contact" onClick={toggleMenu}>Contact Us</NavLink>
            <NavLink to="/SignIn"  onClick={toggleMenu}>Sign In / Up</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
