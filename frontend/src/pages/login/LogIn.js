import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import './LogIn.css'
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Form Submit Function
  const handleSubmit= async(e)=>{
    e.preventDefault();
     try{
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
      if(response.data.success){
          console.log(response);
          localStorage.setItem('auth',JSON.stringify(response.data));
          toast.success('User SuccessFully Logged In',{duration:2000});
          navigate('/homepage')
      }
      else{
          console.log(response.data.message);
          toast.error("Error In Log In")
      }
     }
     catch(error){
       console.log(error);
       toast.error("Error In Log In")
     }
  }
  return (
 <Layout>
    <div className='login'>
      <div className="login-text">
           <h1>Log In To Resume Craft</h1>
        </div>
        <form onSubmit={handleSubmit} action='/submit' method='POST'>
            <div className="mb-3">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>

            <button type="submit" className="btn btn-primary" >Log In</button>
            <Link to="/signup">Already have an account ? Sign Up</Link>
            </form>
            </div>
            
</Layout>
  )
}

export default LogIn