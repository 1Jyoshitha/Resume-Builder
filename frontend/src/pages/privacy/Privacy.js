import React from 'react'
import Layout from '../../components/layout/Layout'
import './Privacy.css'

const Privacy = () => {
  return (
    <Layout title={'Privacy Policy-E Comm'}>
        <div className='policy-box'>
        <div className='policy-img'>
        <img src='https://i.pinimg.com/736x/9e/c0/d6/9ec0d689b6ba400248ecd0a8e7740c18.jpg'/>
        </div>
        <div className='policy-info'>
          <h1>Privacy Policy🔞</h1>
           <p>
           Information We Collect

We collect several different types of information for various purposes to improve our services to you.

Information You Provide Directly: This includes information you enter when you create an account, place an order, subscribe to a newsletter, or contact us. It may include your name, billing and shipping address, email address, phone number, payment information, and any other information you choose to provide.
Information Collected Automatically: When you use the Site, we may automatically collect certain information about your device and browsing activity. This information may include your IP address, browser type, operating system, referral URLs, browsing history, device information (including model and ID), and search terms. We may collect this information using cookies and other tracking technologies.
           </p>
        </div>
      </div>
    </Layout>
  )
}

export default Privacy