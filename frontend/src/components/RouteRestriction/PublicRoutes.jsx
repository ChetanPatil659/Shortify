import React from 'react'
import useAuth from '../../util/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {
    const data = useAuth()
  return data.isLoggedIn ? <Navigate to='/dashboard'/> : <Outlet/>
}

export default PublicRoutes