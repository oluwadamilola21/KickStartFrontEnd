import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope } from 'react-icons/fa'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const SignIn = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const location = useLocation()
  const verified = new URLSearchParams(location.search).get("verified")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (verified) toast.success("Email verified. Please sign in.")
  }, [verified])

  const passwordToggle = () => setShowPassword(!showPassword)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const currentEmail = email;
      const previousEmail = localStorage.getItem("user_email");
      if (previousEmail && previousEmail !== currentEmail) {
        localStorage.clear();
      }
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // ✅ Save token with the key 
      localStorage.setItem("user_email", currentEmail);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error(err.message);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-montserrat py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 text-center font-savate">
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <span onClick={passwordToggle} className="text-gray-500 mr-2 cursor-pointer">
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="focus:outline-none w-full text-sm sm:text-base" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold font-savate py-3 rounded text-sm sm:text-base transition">
            Sign In
          </button>
        </form>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-3 sm:gap-0">
          <p>
            Don't have an account?
            <Link to="/SignUp" className="text-blue-900 font-semibold hover:underline ml-1">
              Sign Up
            </Link>
          </p>
          <Link to="/forgot_password" className="text-blue-900 font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
