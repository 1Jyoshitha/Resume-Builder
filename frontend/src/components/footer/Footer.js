import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <h6>©All Right Reserved To Resume Craft</h6>
      <div className='footer-links'>
      <Link to='/about'>About |</Link>
      <Link to='/contact'>Contact |</Link>
      <Link to='/privacy'>Privacy Policy |</Link>
      </div>
      
    </div>
  )
}

export default Footer