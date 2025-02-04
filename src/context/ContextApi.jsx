import React, { createContext, useEffect, useState } from 'react'


export const addResponseContext=createContext()
export const editResponseContext=createContext()
export const authorizationContext=createContext()
function ContextApi({children}) {
    const [addResponse,setAddResponse]=useState("")
    const [editResponse,setEditResponse]=useState("")
    const [isAuthorised,setIsAuthorised]=useState(false)

    useEffect(() => {
      if(sessionStorage.getItem("token")){
        setIsAuthorised(true)
      }
      else{
        setIsAuthorised(false)
      }
    }, [isAuthorised])
    
  return (
    <div>
        <addResponseContext.Provider value={{addResponse,setAddResponse}} >
         <editResponseContext.Provider value={{editResponse,setEditResponse}} > 
          <authorizationContext.Provider value={{isAuthorised,setIsAuthorised}} >{children}</authorizationContext.Provider>
          </editResponseContext.Provider>
        </addResponseContext.Provider>
    </div>
  )
}

export default ContextApi 