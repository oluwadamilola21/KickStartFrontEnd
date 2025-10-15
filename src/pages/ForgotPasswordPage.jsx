import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const API_BASE_URL = "process.env.REACT_APP_API_URL";
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to send reset link');
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-montserrat bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center font-savate mb-2">Forgot Password?</h2>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input type="email" id="email" name="email" className="focus:outline-none w-full text-sm sm:text-base" required value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
          </div>

          <button type="submit" className="w-full sm:w-auto px-4 py-3 text-sm sm:text-base font-bold rounded bg-blue-900 font-savate text-white hover:bg-blue-700 transition-colors block mx-auto">
            Send
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm sm:text-base text-red-600">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm sm:text-base">
          Remembered?{' '}
          <Link to="/signin" className="text-blue-900 underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
