import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import HomePage from './pages/HomePage'
import ResetPassword from './pages/ResetPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DashboardLayout from './Layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import VerifyEmail from './pages/VerifyEmail';
import Bootcamp from './pages/Bootcamp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import Contact from './pages/Contact'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="forgot_password" element={<ForgotPasswordPage />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/verify-email" element={<VerifyEmail />} /> {/* <-- Add this */}

        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bootcamp" element={<Bootcamp />} />
        </Route>
      </>

    )
  )
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>

  )
}

export default App
