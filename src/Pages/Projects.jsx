import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectApi } from '../Services/allApi'
function Projects() {

  const[allPojects,setAllprojects]=useState()

  const [seachKey,setSeachKey]=useState("") 
  console.log(seachKey);
   
  useEffect(() => {
   getAllprojects()
  }, [seachKey])

  const getAllprojects=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={"Authorization":`Bearer ${token}`}
      try {
        const result=await getAllProjectApi(seachKey,reqHeader)
        console.log(result);
        if(result.status==200){
          setAllprojects(result.data)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
    else{
      console.log("Login first");
      
    }

    
    
  }
  
  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between" >
          <h3>All Projects</h3>
          <input type="text" onChange={(e)=>setSeachKey(e.target.value)} className='form-control w-50' placeholder='search projects by language' />
        </div>
        <div className="row   mt-5">
          {
            allPojects?.length>0?
            allPojects?.map(projects=>(
<div className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
            <ProjectCard displayData={projects}/>
            </div>
            ))
            :
            <h4 className='text-center'>Nothing to display</h4>
            
          }
         

        </div>
      </div>
    </div>
  )
}

export default Projects