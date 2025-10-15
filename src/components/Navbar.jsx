import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/Images/Icon (1).jpg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Scroll effect only on home page
  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        if (window.innerWidth >= 768) {
          setScrolled(window.scrollY > 50)
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setScrolled(true)
    }
  }, [location.pathname])

  const activeClass =
    'relative text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-yellow-400 after:rounded-full'
  const inactiveClass = 'text-white/50 hover:text-white relative'


  const navbarBg = 'bg-blue-900' + (scrolled? ' md:bg-blue-900 md:shadow-md' : location.pathname === '/' ? ' md:bg-transparent' : ' md:bg-blue-900')

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img className="h-10 w-auto" src={Logo} alt="Kick-Start Logo" />
              <span className="text-white text-xl font-bold ml-2 font-montserrat">
                Kick-Start Digital Hub
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6 text-white font-savate">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Home
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Contact Us
            </NavLink>
            <NavLink to="/SignIn" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Sign In / Up
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-400 focus:outline-none" aria-expanded={menuOpen}>
              <svg
                className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-1 pt-2 pb-3 bg-blue-900 font-savate">
            <NavLink to="/" onClick={toggleMenu} className="hover:text-yellow-400">
              Home
            </NavLink>
            <NavLink to="/contact" onClick={toggleMenu} className="hover:text-yellow-400">
              Contact Us
            </NavLink>
            <NavLink to="/SignIn" onClick={toggleMenu} className="hover:text-yellow-400">
              Sign In / Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
