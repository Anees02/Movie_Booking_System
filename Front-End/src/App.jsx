import { useState } from 'react'

import './App.css'
import Header from './Componets/Header'
import Poster from './Componets/Poster'
import Abstract from './Componets/Abstract'
import { Formik } from 'formik'
import AddMovie from './Componets/AddMovie'
import Seats from './Componets/Seats'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Outlet />

    </>
  )
}

export default App
