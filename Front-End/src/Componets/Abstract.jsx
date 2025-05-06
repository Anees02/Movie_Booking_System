import React, { useContext, useEffect } from 'react'
import Poster from './Poster';
import AddMovie from './AddMovie';
import { Formik } from 'formik';
import myContext from '../context/MyContext';
import api from '../api/myaxios';

function Abstract() {

  const {cinemahall, setCinemahall} = useContext(myContext)

  const fn = async () =>{
    const halls = await api.get(`${import.meta.env.VITE_APP_URL}/halls`);
    setCinemahall(halls.data);
    }

    useEffect(()=>{
        fn()
        
    },[])

    //console.log(cinemahall)
    

  return (
    <div className='abstract'>
      {
        cinemahall.map((i,index) => <Poster key = {index} hall = {i} />)
      }
    </div>
  )
}

export default Abstract