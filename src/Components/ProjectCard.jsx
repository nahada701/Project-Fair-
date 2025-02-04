import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import projectImage from '../assets/projectFile.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import  serverURL  from '../Services/serverURL';

function ProjectCard({displayData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (

    <div>
    <Card style={{ width: '18rem'}}  onClick={handleShow}>
    <Card.Img variant="top" style={{height:"17rem"}} src={`${serverURL}/uploads/${displayData?.projectImg}`} />
    <Card.Body>
      <Card.Title className='text-center'>{displayData?.title}</Card.Title>
    </Card.Body>
  </Card>  

     <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className='row'>
                <div className="col-md-6">
                    <img src={`${serverURL}/uploads/${displayData?.projectImg}`} alt="" style={{width:"16rem",height:"17rem"}}  className='w-100' />
                   
                </div>
                <div className="col-md-6">
                    <h3 className='my-3'> {displayData?.title}</h3>
                    <h5>Languages used: <span className='text-info'>{displayData?.languages}</span></h5>
                    <p><span className='fs-5 fw-bold'>Project overview</span>: {displayData?.overView} </p>
                 
                </div>

            </div>
            <button className='btn btn-secondary mt-1 '><i className='fa-brands fa-github text-dark'></i></button>
                    <button className='btn btn-secondary ms-1 mt-1'><i className='fa-link fa-solid text-dark'></i></button>


        </Modal.Body>
      
      </Modal> 
    </div>
  )
}

export default ProjectCard