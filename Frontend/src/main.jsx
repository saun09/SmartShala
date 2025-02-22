import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router=createBrowserRouter([
  {
    path:"/signup",
    element:<Signin/>
  },
  {
    path:"/signin",
    element:<Signin/>
  },
  // {
  //   path:"/form",
  //   element:<Form/>
  // },
  // {
  //   path:"/student",
  //   element:<home/>
  // },
 
 
]);


  



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Signup/>
   
    
 
    </>
    
  </StrictMode>,
)
