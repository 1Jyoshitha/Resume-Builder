import React from 'react'
import './Contact.css'
import Layout from '../../components/layout/Layout'
const Contact = () => {
  return (
    <Layout>
     <div className='contact-box'>
      <div className='contact-img'>
      <img src='https://www.shutterstock.com/image-vector/contact-us-icon-logo-modern-600nw-567152911.jpg'/>
      </div>
      <div className='contact-info'>
      <h1>Contact Us</h1>
      <h6>Any query and info about product feel free to call we are available 24x7 for you</h6>
      <p>Email : jyoshikdr@gmail.com</p>
      <p>Mobile : 9182091214</p>
      </div>
     </div>
    </Layout>
  )
}

export default Contact