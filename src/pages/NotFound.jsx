import React from 'react'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
 
  const navigate=useNavigate()
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
      <div className='text-center'>
      <h1>Oops!</h1>
      <p>Sorry, This page was not found. <span onClick={()=>navigate("/",{replace:true})} className='text-primary' style={{cursor:"pointer"}}>Go to home page</span></p>
      </div>
    </div>
  )
}

export default NotFound