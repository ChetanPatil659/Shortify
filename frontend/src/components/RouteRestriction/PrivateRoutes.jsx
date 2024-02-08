import React from 'react'
import useAuth from '../../util/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    const data = useAuth()
  return data.isLoggedIn ? (<Outlet/>) : <Navigate to='/login'/>
}

export default PrivateRoutes