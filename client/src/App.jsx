import { useState } from 'react'
import Header from './components/Header'
import Clients from './views/Clients'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <Toaster />

    <Header/>
    <main className='container mx-auto mt-6 px-8 '>
      <Outlet />
    </main>
    <Footer/>
    </>
    
  )
}

export default App
