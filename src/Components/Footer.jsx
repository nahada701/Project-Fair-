import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
<div className='bg-dark py-1' >
    <div className='container px-2 w-100 mt-5 ' >
        <div className="d-flex justify-content-between flex-wrap">
            <div className='d-flex flex-column pb-2' style={{width:"400px"}}>
                <h3> <i className='fa-brands fa-docker'></i> Project fair</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni laborum rerum laudantium officia qui est dolor saepe consequuntur dignissimos animi pariatur earum eius, repellendus nihil nam eum assumenda quos doloribus?</p>
                <p>Liscenced by Nahada pvtLTD</p>
                <p>Version V6.6.7</p>
            </div>
            <div className='d-flex flex-column pb-2'>
                <h3>Links</h3>
                <Link to={'/'} style={{textDecoration:'none'}}>Home</Link>
                <Link to={'/login'} style={{textDecoration:'none'}}>Login</Link>
                <Link to={'/register'} style={{textDecoration:'none'}}>Register</Link>
    
           
            </div> 
            <div className='d-flex flex-column pb-2 '>
                <h3>Guids</h3>
                <a style={{textDecoration:'none'}}>React</a>
                <a  style={{textDecoration:'none'}}>React Boostrap</a>
                <a  style={{textDecoration:'none'}}>React Router</a>
    
           
            </div>  
            <div className='d-flex flex-column mb-2'>
                <h3>Sent feedback</h3>
               <div className='d-flex'>
                   <input type="text"  className='form-control' placeholder='Write feedback'/>
                   <button className='btn btn-info ms-3'> <i className='fa-solid fa-arrow-right'></i></button>
        
               </div>
               <div className="d-flex mt-4 justify-content-between">
                <i className='fa-brands fa-twitter '></i>
                <i className='fa-brands fa-facebook'></i>
                <i className='fa-brands fa-instagram'></i>
                <i className='fa-brands fa-github'></i>
                <i className='fa-brands fa-linkedin'></i>
    
               </div>
           
            </div>  
        </div>
        <p className='text-center mt-2 fw-bold pb-4'>Copyright &copy; Nahada privet limited ,Project fair made with love</p>
    </div>
</div>
  )
}

export default Footer