import React, { useContext, useState } from 'react'
import loginImage from '../assets/login.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, resgisterApi } from '../Services/allApi';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { authorizationContext } from '../context/ContextApi';


function Auth({ insideRegister }) {

      const {isAuthorised,setIsAuthorised}=useContext(authorizationContext)
    
    const [userDetails,setUserDetails]=useState({username:"",email:"",password:""})

    const [islogin,setIsLogin] =useState(false)
    const navigate=useNavigate()

    const handleRegister=async()=>{
        if(userDetails.username && userDetails.email && userDetails.password){
          try{
            const result=await resgisterApi(userDetails)
            console.log(result);
            if(result.status==200){
                setUserDetails({username:"",email:"",password:""})
                navigate('/login')
              
            }
            else {
                if(result.status==406){
                toast.error(result.response.data)
     
            }

            }
            
          }
          catch(err){
            console.log(err);
            
          }
        }
        else{
            toast.warning("please enter the fields completly")
        }
    }

    const handleLogin=async()=>{
        if(userDetails.email && userDetails.password){
            try{
                const result=await loginApi(userDetails)
                console.log(result);

                if(result.status==200){
                    setIsAuthorised(true)
                    sessionStorage.setItem("user",JSON.stringify(result.data.user))
                    sessionStorage.setItem("token",result.data.token)
                    setIsLogin(true)
                    setTimeout(() => {
                    setUserDetails({username:"",email:"",password:""})
                    navigate('/')
                    setIsLogin(false) 
                    }, 2000);
                    
                    
                    
                }
                else{
                    if(result.status==404){
                        toast.error(result.response.data)
                    }
                }
                
            }
            catch(err){
                console.log(err);
                
            }
        
        }
        else{
            toast.warning("please enter the fields completly")
        }
    }
    return (
        <div>
            <div style={{ width: "100%", minHeight: "80vh" }}>
                <div className="container w-75 my-5 shadow w-100">
                    <div className='card mb-5 '>
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center">
                                <img src={loginImage} alt="" className='img-fluid w-75' />

                            </div> 
                            <div className='col-md-6 d-flex flex-column   align-items-center justify-content-sm-center'>
                                <h3 className='mt-3'> <i className='fa-brands fa-docker'></i>Project Fair</h3>
                                <h5 className='mt-2'>Sign {insideRegister?'up':'in'} to your account</h5>
                                {insideRegister && <FloatingLabel
                                    controlId="floatingInput1"
                                    label="User name"
                                    className="mb-2 w-75"
                                   
                                >
                                    <Form.Control value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder="Alex" />
                                </FloatingLabel>}
                                <FloatingLabel
                                    controlId="floatingInput2"
                                    label="Email address"
                                    className="mb-2 w-75"
                                    

                                >
                                    <Form.Control value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className='w-75 mb-2'>
                                    <Form.Control value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder="Password" />
                                </FloatingLabel>

                                {insideRegister 
                                
                                ? 
                             <div className='d-flex flex-column align-items-center'>
                                    <button className='btn btn-primary w-75 ' onClick={handleRegister}>Register</button>
    
                                    <p className='py-2'>Already have an account ? <Link to={'/login'}>Login</Link></p>
                             </div>
                                :
                               <div className='d-flex flex-column align-items-center'>
                                    <button className='btn btn-primary w-75' onClick={handleLogin} >Login {islogin && <Spinner className='ps-1' style={{width:"20px",height:"20px"}} animation="grow" />}</button>
                                    
                                    <p className='py-2'>Don't have an account yet? <Link to={'/register'}>Register</Link></p>
                               </div>
                                    }
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth