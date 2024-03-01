import React from 'react'
import Router from './router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

console.log(process.env)

function App () {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}

export default App
