import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Diary, Login, Signup } from '../pages/'

const Router = () => {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/diary" element={<Diary />} />
  </Routes>
  )
}

export default Router
