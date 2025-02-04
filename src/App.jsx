
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Projects from './Pages/Projects'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { authorizationContext } from './context/ContextApi'



function App() {
  const {isAuthorised,setIsAuthorised}=useContext(authorizationContext)

  
  return (
    <>
    
    <ToastContainer position="top-right" autoClose={2000} theme="colored"/>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/login' element={<Auth/>} ></Route>
      <Route path='/register'  element={<Auth insideRegister={true}/>} ></Route>
     <Route path='/projects'  element={isAuthorised?<Projects/>:<Navigate to={'/login'}/>} ></Route>
      
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>} ></Route>
      <Route path='/*' element={<Navigate to={'/'} />} ></Route>
    </Routes>

    </>
   
  )
}

export default App
