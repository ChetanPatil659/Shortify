import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Appbar from './components/Appbar'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import PrivateRoutes from './components/RouteRestriction/PrivateRoutes'
import PublicRoutes from './components/RouteRestriction/PublicRoutes'
import Profile from './pages/Profile/Profile'

function MainRoute() {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoutes/>}>
          <Route path='/' element={<Navigate replace to='dashboard'/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>

        <Route path='' element={<PublicRoutes/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Route>
    </Routes>
  )
}

export default MainRoute