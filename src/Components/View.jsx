import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteUserProjectApi, getUserProjectApi } from '../Services/allApi'
import { addResponseContext } from '../context/ContextApi'
import { editResponseContext } from '../context/ContextApi';


function View() {
    const {addResponse,setAddResponse}=useContext(addResponseContext)
    const {editResponse,setEditResponse}=useContext(editResponseContext)
    const[userProject,setUserProject]=useState()
    
    useEffect(() => {
        getUserProject()
    }, [addResponse,editResponse])

    const getUserProject=async()=>{
        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
         
        try{
         const result=await getUserProjectApi(reqHeader)

         if(result.status==200){
            setUserProject(result.data)

         }
         
    
        }
        catch(err){
          console.log(err);
          
        }}
        else{
            console.log("login first");
            
        }
      }
    const handleDeleteProjct=async(pid)=>{

      const token=sessionStorage.getItem("token")
      if(token){
      
          const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        
        try{

          const result=await deleteUserProjectApi(pid,reqHeader)
          getUserProject()
          
        }catch(err){
          console.log(err);
          
        }
      }
     
    }
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h5>All projects</h5>
                <Add/>
            </div>
            <div className='mt-3'>

               {
                userProject?.length>0&&
               userProject?.map(project=>(
                <div className='mb-2 border border-3 rounded d-flex justify-content-between p-2 '>
                <h4>{project?.title}</h4>
                <div className='d-flex align-items-center align-items-center gap-2'>
                <Edit project={project}/>
                <a href={project?.github}><i className='fa-brands fa-github'></i></a>
                
                <button onClick={()=>handleDeleteProjct(project?._id)} style={{border:"none",backgroundColor:"transparent"}}><i className='fa-solid fa-trash-can text-primary'></i></button>
                </div>
            </div>
               ))
              }
            </div>
        </div>
    )
}

export default View