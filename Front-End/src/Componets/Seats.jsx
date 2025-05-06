import React, { use, useState } from "react";
import "./Seats.css";
import Seat from "./Seat";
import { useLocation } from "react-router-dom";
import api from "../api/myaxios";

function Seats(){
  const [selected, setSelected] = useState([]);

  const location = useLocation();
  const {hall} = location.state

  const seats = hall.seats
  const movie = hall.movie
  //console.log(selected)


  const seat = 30;

  const items = []

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((seat) => seat !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const book = async() =>{
    const res = await api.post(`${import.meta.env.VITE_APP_URL}/seat/${hall.id}`,selected)
    alert("booked")
  }

  
  return (
    <div className="seat-top">
        <div className="title"><h3>SCREEN: {movie.name}</h3></div>
        <div className="seat-main">
            {
                seats.map((i,index) => <Seat key={index} id = {i.id} seatNumber={i.seatNumber} booked = {i.booked} toggleSelect={toggleSelect} />)
            }
        </div>
        <div className="selected-count">
        <p>Selected Seats: {selected.length}</p>
      </div>
      <div className="book">
          <button onClick={()=> book()}>Book Now</button>
      </div>
    </div>
  )
}

export default Seats
