import React from 'react'
import Router from './router'

function App () {
  console.log('Todas as variáveis de ambiente:', JSON.stringify(process.env))

  return (
    <Router />
  )
}

export default App
