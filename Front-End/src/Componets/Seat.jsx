import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function Seat({id,seatNumber,booked,toggleSelect}) {
  
  
  const [selected, setSelected] = useState(booked)

  
 
  const changeColor = (e)=>{
      if(!booked){
        toggleSelect(id);
        setSelected(!selected)
      }
  }
  return (
    <div className={`seat-no ${booked ? "booked": selected ? "selected" : ""}`} onClick={() =>changeColor()}>
        {seatNumber}
    </div>
  )
}

export default Seat