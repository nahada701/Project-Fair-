import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import adduser from '../assets/adduser.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import serverURL from '../Services/serverURL';
import { toast } from 'react-toastify';
import { editProfileApi } from '../Services/allApi';

function Profile() {
    const [open, setOpen] = useState(false);
    // to hold new profile image 
    const[userDetails,setUserDetails]=useState({username:"",email:"",password:"",github:"",linkedin:"",profilepic:""})

    // to hold new old image 

    const[existingImg,setExistingImg]=useState("")

    //to shoe preview 

    const [preview,setPreview]=useState()
    
    console.log(userDetails);
    
useEffect(() => {
  if(sessionStorage.getItem("user")){
    
    const existingUser=JSON.parse(sessionStorage.getItem('user'))

    
    setUserDetails({...userDetails,username:existingUser?.username,email:existingUser?.email,password:existingUser?.password,github:existingUser?.github,linkedin:existingUser?.linkedin})

    setExistingImg(existingUser?.profilepic)
  }


 
}, [open])
useEffect(() => {
  
  if(userDetails.profilepic){
    setPreview(URL.createObjectURL(userDetails.profilepic))
  }
  else{ 
    setPreview("")
  }
}, [userDetails.profilepic])


const handleUpdate=async()=>{
  const {username,email,password,github,linkedin,profilepic}=userDetails
  if (github && linkedin){
    const reqBody=new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    reqBody.append("profilepic",preview?profilepic:existingImg)

    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "content-type":preview?"multipart/form-data":"application/json",
        "authorization":`Bearer ${token}`
      }
      try{
       const result = await editProfileApi(reqBody,reqHeader)
       console.log(result);
       if(result.status==200){
        setOpen(!open)
        sessionStorage.setItem("user",JSON.stringify(result.data))
       }
      
       
      }catch(err){
        console.log(err);
        
      }
    }
   

  }
  else{
    toast.warning("please fill all feild completely")
  }
}


  return (
    <div>
        <div className='d-flex justify-content-between'>
            <h3>Profile <i className='fa-user fa-solid'></i>
            </h3>
            <button className='btn' onClick={() => setOpen(!open)}>
        <i class="fa-solid fa-angle-down" ></i>

        </button>
     
        </div>
                 
        <Collapse in={open}>
        <div id="example-collapse-text">
            <div  className='d-flex flex-column align-items-center'>
                <label>
                    <input type="file"  onChange={(e) => setUserDetails({ ...userDetails, profilepic: e.target.files[0] })}  style={{width:"250px"}} className='d-none' />
                    {
                      existingImg==""?
                      <img className='rounded-circle' src={preview?preview:adduser} style={{width:"250px",height:"250px"}}   alt="" />
                      :
                      <img className='rounded-circle'  style={{width:"250px",height:"250px"}} src={preview?preview:`${serverURL}/uploads/${existingImg}`} alt="" />

                    }
                    </label>
      <FloatingLabel
        controlId="floatingInput"
        label="Github link"
        className="mb-2 mt-2 w-75"
        
      >
        <Form.Control value={userDetails?.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder="github link" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Linkedin link"
        className="mb-2 w-75"
      >
        <Form.Control value={userDetails?.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" placeholder="linkedin link" />
      </FloatingLabel>
      <button className='btn btn-primary w-75' onClick={handleUpdate} >Update Profile</button>
            </div>
       
        </div>
      </Collapse>
     
    </div>
  )
}

export default Profile