import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav'


const DashboardLayout = () => {
    return (
        <>
            <DashboardNav />
            <Outlet />
        </>

    )
}

export default DashboardLayout