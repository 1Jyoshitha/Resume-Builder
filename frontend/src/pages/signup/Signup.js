import React, { useState } from 'react'
import './Signup.css'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();

    //Form Submit Function
    const handleSubmit= async(e)=>{
        
      e.preventDefault();
       try{
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,contact});
        if(response.data.success){
            console.log(response);
            localStorage.setItem('auth',JSON.stringify(response.data));
            toast.success('User Successfully Registered')
            navigate('/')
            
        }
        else{
            console.log(response.data.message);
        }
       }
       catch(error){console.log(error);toast.error("Error In Registration")}
    }
    return (
        <Layout >
            <div className='register'>
              <div className="register-text">
                   <h1>Sign Up To Resume Craft</h1>
                </div>
                <form onSubmit={handleSubmit} action='/submit' method='POST'>
                    <div className="mb-3">
                        <input type="text" className="form-control " id="exampleInputName" placeholder='Enter Name' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" id="exampleInputPhone" placeholder='Enter Mobile Number' value={contact} onChange={(e)=>{setContact(e.target.value)}} required/>
                    </div>
    
                    <button type="submit" className="btn btn-primary" >Submit</button>
                    <Link to="/">Already have an account?Log In</Link>
                    </form>
                    </div>
                    
        </Layout>
    )
}

export default Signup