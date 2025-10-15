import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaUser } from 'react-icons/fa'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const SignUp = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { username, email, password, confirm_password: rePassword }

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) {
        setIsError(true)
        setMessage(data.detail || "Something went wrong.")
      } else {
        setIsError(false)
        setMessage("✅ Registration successful. Please check your email to verify your account.")
        setTimeout(() => navigate("/SignIn"), 10000)
      }
    } catch (err) {
      setIsError(true)
      setMessage("❌ Something went wrong; try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-montserrat">
      <div className="max-w-md mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 text-center font-savate pt-6 sm:pt-10 md:pt-8 lg:pt-6">
          Get started now...
        </h2>


        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">User Name</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <FaUser className="text-gray-500 mr-2" />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Password</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <span onClick={() => setShowPassword(!showPassword)} className="text-gray-500 mr-2 cursor-pointer">
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <span onClick={() => setShowRePassword(!showRePassword)} className="text-gray-500 mr-2 cursor-pointer">
                {showRePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
              <input type={showRePassword ? 'text' : 'password'} value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-900 hover:bg-blue-700'} text-white font-semibold py-3 rounded text-sm sm:text-base font-savate transition-colors`}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center font-semibold" style={{ color: isError ? "red" : "green" }}>
            {message}
          </p>
        )}

        {/* Sign In Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/SignIn" className="text-blue-900 font-semibold hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
