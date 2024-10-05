import React from 'react'
import logo from "../images/amazonLogo.1c9be0b254d3ff1dc9e9.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark py-5 px-3 text-center'>
        <div className='d-flex align-items-start justify-content-center flex-wrap gap-2'>
            <h5 className=' text-light'>All rights &copy; reserved to Amazon.com</h5>
            <Link to="/" className='mt-2'><img src={logo} alt='logo-img' style={{width:"100px"}}/></Link>
        </div>
        <p className='m-0 text-light'>Created by <a href="mailto:aaref8626@gmail.com" className="text-warning text-decoration-none">Ahmmed Aref</a></p>
    </div>
  )
}

export default Footer