import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './Layout.css'
import {Toaster} from 'react-hot-toast'
const Layout = ({children}) => {
  return (
    <div className='layout-container'>
    <Header/>
    
      <main style={{minHeight:'100vh'}}>{children}</main>
      <Toaster position='top-right'/>
    <Footer/>
    </div>
  )
}

export default Layout