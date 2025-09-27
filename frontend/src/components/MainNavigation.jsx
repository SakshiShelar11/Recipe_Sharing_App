import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function MainNavigation({ isLoggedIn, user, onLogout }) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
      <Outlet />
    </>
  )
}
