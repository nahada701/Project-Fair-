import commenApi from './commenApi'
import serverURL from './serverURL'

export const resgisterApi=async(reqBody)=>{
return await commenApi("POST",`${serverURL}/register`,reqBody)
}

export const loginApi=async(reqBody)=>{
    return await commenApi("POST",`${serverURL}/login`,reqBody)
}

export const addProject=async(reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/add-project`,reqBody,reqHeader)
}

export const getHomeProjectApi=async()=>{
    return await commenApi("GET",`${serverURL}/get-home-projects`)
}

export const getAllProjectApi=async(seachKey,reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-all-projects?search=${seachKey}`,"",reqHeader)
}

export const getUserProjectApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-user-projects`,"",reqHeader)
}

export const editProjectApi=async(pid,reqBody,reqHeader)=>{
    return await commenApi("PUT",`${serverURL}/edit-user-projects/${pid}`,reqBody,reqHeader)
}


export const deleteUserProjectApi=async(pid,reqHeader)=>{
    return await commenApi("DELETE",`${serverURL}/delete-user-project/${pid}`,{},reqHeader)
}

export const editProfileApi=async(reqBody,reqHeader)=>{
    return await commenApi("PUT",`${serverURL}/edit-profile`,reqBody,reqHeader)
}