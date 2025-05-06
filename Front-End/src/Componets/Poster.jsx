import React from 'react'
import { useNavigate } from 'react-router-dom';


function Poster({hall}) {

  
  const navigate = useNavigate();

  const movie = hall?.movie;

  const navigator = ()=>{
    
    navigate('/seats',{state: {hall}})
  }
  
  return (

    
    <div className='poster'>
      {movie && (
        <>
          <div className='title'>{movie.name}</div>
          <div className='poster-img'>
            <img src={movie.url} alt='Booking it' />
          </div>
          <div className='poster-btn'>
            <button onClick={() => navigator()}>Book Now</button>
          </div>
        </>
      )}
    </div>
    
  )
}

export default Poster