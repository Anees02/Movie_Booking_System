import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();

  const navigator = () =>{
    navigate("/")
  }
  return (
    <header>
      <div className='title' onClick={()=>navigator()}>
        <h2  >Movie Booking System</h2>
      </div>
      <div className='header-btn'>
        <button onClick={()=> navigate('/addMovie')}>Add Movie</button>
      </div>
    </header>
  )
}

export default Header