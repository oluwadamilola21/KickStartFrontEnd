import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const ContactUs = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Message not sent')

      toast.success(data.message)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full px-4 sm:px-6 md:px-8 py-10 flex justify-center font-montserrat">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-6 font-savate pt-6 sm:pt-10 md:pt-8 lg:pt-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-sm text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-sm text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-900 hover:bg-blue-700 font-savate'} text-white font-semibold py-3 rounded text-sm sm:text-base transition-colors font-savate`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Email:{" "}
              <a href="mailto:kickstartdigital@gmail.com" className="text-blue-900 hover:underline">
                kickstartdigital@gmail.com
              </a>
            </p>
            <p>Phone: +23432643110</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
