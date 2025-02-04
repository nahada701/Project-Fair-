import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { authorizationContext } from '../context/ContextApi';

function Header() {

  const {isAuthorised,setIsAuthorised}=useContext(authorizationContext)
  const navigate= useNavigate()
  const handlelogout=()=>{
    sessionStorage.clear()
    navigate('/login')
    setIsAuthorised(false)
  }
  return (
    <div>
        <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand className='fs-4'>
           <Link style={{textDecoration:"none"}} to={'/'}> <i className='fa-brands fa-docker'></i>Project fair </Link>
          
          </Navbar.Brand>
          <div className='ms-auto '>
           <button className=' btn btn-info' onClick={handlelogout}>Logout</button>

           </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header