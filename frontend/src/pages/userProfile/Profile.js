import React, { useEffect } from 'react'
import './Profile.css'
import Layout from '../../components/layout/Layout'
import {Link} from 'react-router-dom'

const Profile = () => {
    const auth = localStorage.getItem("auth");
    const useAuth = JSON.parse(auth)
    const id = useAuth.user.id;
    
  

      
  return (
    <Layout>
        <div className='user-profile'>
          <div className='user-box'>
              <h1>Your Profile <span>🦝</span></h1>
              {/* <p><span>Your Id</span>-{useAuth.user.id}</p> */}
              <p><span>Your Name</span>-{useAuth.user.name}</p>
              <p><span>Your Email</span>-{useAuth.user.email}</p>
              <p><span>Your Contact</span>-{useAuth.user.contact}</p>
              <div>
            <Link to={`/edit-profile/${id}`}>Edit Profile</Link>
            </div>
          </div>
          
        </div>
    </Layout>
  )
}

export default Profile