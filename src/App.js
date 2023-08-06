import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { useSelector } from 'react-redux'
function App() {
  const isLoggedIn = useSelector((state)=>state.employee.isLoggedIn)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        isLoggedIn.loggedIn ? <Home loggedType={isLoggedIn[0]?.type || isLoggedIn.type} /> : <SignIn />
      } />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
