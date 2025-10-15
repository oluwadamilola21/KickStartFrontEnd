import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {
  const API_BASE_URL = "process.env.REACT_APP_API_URL";

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const navigate = useNavigate()
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('token') || ''

  useEffect(() => {
    if (!token) toast.error('No reset token provided.')
  }, [token])

  const handleSubmit = async e => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    try {
      const res = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword, confirm_password: confirmPassword })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Reset failed')

      toast.success('Password reset successful!')
      setTimeout(() => navigate('/signin', { replace: true, state: { info: data.message } }), 2000)
    } catch (err) {
      toast.error(err.message || 'An error occurred. Please try again')
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 font-montserrat">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-4 font-savate">
            Reset Password
          </h2>

          {!token ? (
            <p className="text-red-600 text-center text-sm sm:text-base">
              Something went wrong, Please try again.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                  <span onClick={() => setShowPassword(!showPassword)} className="text-gray-500 mr-2 cursor-pointer">
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                  <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
                  Confirm Password
                </label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                  <span onClick={() => setShowRePassword(!showRePassword)} className="text-gray-500 mr-2 cursor-pointer">
                    {showRePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                  <input type={showRePassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
                </div>
              </div>

              <button type="submit" className="w-full sm:w-auto px-4 py-3 mt-2 text-sm sm:text-base font-bold font-savate rounded bg-blue-900 text-white hover:bg-blue-800 transition-colors block mx-auto">
                Reset
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm sm:text-base">
            <Link to="/signin" className="text-blue-900 underline font-medium">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
