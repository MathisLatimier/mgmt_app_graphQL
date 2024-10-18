import { useState } from 'react'
import Header from './components/Header'
import Clients from './views/Clients'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
    <Toaster />

    <header>
      <Header/>

    </header>
    <main className='container mx-auto mt-6 px-8 '>
      <Outlet />
    </main>
    </>
    
  )
}

export default App
