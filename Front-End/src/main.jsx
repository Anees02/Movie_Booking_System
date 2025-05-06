import React, { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Abstract from './Componets/Abstract.jsx'
import AddMovie from './Componets/AddMovie.jsx'
import Seats from './Componets/Seats.jsx'
import ReactDOM from 'react-dom/client'
import { MyContextProvider } from './context/MyContext.jsx'

const router = createBrowserRouter([{
  path:"/",
  element: <App/>,
  children:[{
    path:'/',
    element:<Abstract/>
  },
  {
    path: 'addMovie',
    element:<AddMovie/>
  },
  {
    path:'seats',
    element:<Seats/>,
    
  }]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
      <RouterProvider router={router}/>
    </MyContextProvider>
    
    
  </React.StrictMode>,
)
