import {  createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import api from "../api/myaxios";

const myContext = createContext({})


export const MyContextProvider = ({children}) => {
    const [cinemahall, setCinemahall] = useState([])

    
    return (
    <myContext.Provider value={{cinemahall, setCinemahall}} >
        {children}
    </myContext.Provider>
    );


}

export default myContext;