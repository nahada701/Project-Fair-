import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Profile from '../Components/Profile'
import View from '../Components/View'

function Dashboard() {
  const [username,setUsername]=useState('')
  useEffect(() => {
   if(sessionStorage.getItem("user")){
    setUsername(JSON.parse(sessionStorage.getItem("user")).username)
   
   }
   else{
   setUsername("")
   }
  

  }, [])
  


  return (
    <div>
    <Header/>
    <div className="container my-4">
        <div className="row">
            <div className="col-lg-8 mb-4 ">
                <h1>Welcome <span className='text-danger'> {username.split(" ")[0]}</span></h1>
             
                <View/>
            </div>
            <div className="col-lg-4 mb-4 ">
                <Profile/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard