import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../util/useAuth'
import { logout } from '../Services/authServices'

function Appbar() {
  const isLoggedIn = useAuth()
  const navigate = useNavigate()
  return (
    <div className='flex justify-between px-6 mt-4'>
        <h1 className='font-bold text-2xl'>Shortify</h1>

        <div className='nav-menus flex space-x-4 text-zinc-500'>
            <button className=''>dashboard</button>
            <button>profile</button>
            {isLoggedIn ? <button onClick={()=>logout(navigate)}>logout</button>: <h3></h3>}
        </div>
    </div>
  )
}

export default Appbar
