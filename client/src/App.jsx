import { useState } from 'react'
import Header from './components/Header'
import Clients from './components/Clients'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <Header/>
      <div className='container mx-auto mt-6'>
        <Outlet />
      </div>
    </>
    
  )
}

export default App
