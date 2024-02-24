import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, Signup } from '../pages/'

const Router = () => {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
  )
}

export default Router
