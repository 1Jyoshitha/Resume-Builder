import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProfile.css";
import toast from "react-hot-toast";


const EditProfile = () => {
    const params = useParams();
    const [names,setNames] = useState("");
    const [contacts,setContacts] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        console.log(params);
        getProductDetails()
      }, []);
     

 const getProductDetails=async()=>{
    try{
    let result = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/get-user/${params.id}`,{name:names,contact:contacts})
    console.log(result)
    setNames(result.data.name);
    setContacts(result.data.contact);
    console.log(result.data.name)
    }
    catch(error){
        console.log(error);
        toast.error("Error In Fetching Details")
    }
 }  
 const updateInfo=async(e)=>{
    e.preventDefault();
      try{
        let result = await axios.put(`${process.env.REACT_APP_API}/api/v1/update/update-user/${params.id}`,{name:names,contact:contacts})
        console.log(result);
        toast.success("User Updated SuccessFully Please! LogIn Again")
        navigate('/user-profile')
      }
      catch(error){
        console.log(error);
        toast.error("Error In Update")
      }
 }  
  return (
    <Layout>
      <div className="edit-box">
        <div className="edit-form">
          <h1>Edit Profile</h1>
          <input type="text" value={names} onChange={(e)=>setNames(e.target.value)}/>
          <input type="text" value={contacts} onChange={(e)=>setContacts(e.target.value)}/>
          <button onClick={updateInfo}>Update</button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
