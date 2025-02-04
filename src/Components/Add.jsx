import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addimage from '../assets/addimage.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../Services/allApi';
import { addResponseContext } from '../context/ContextApi';


function Add() {

  const{addResponse,setAddResponse}=useContext(addResponseContext)

  const [projectDetails, setProjectDetails] = useState({ title: "", languages: "", github: "", website: "", overView: "", projectImg: "" })
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setProjectDetails({ title: "", languages: "", github: "", website: "", overView: "", projectImg: "" })
  };
  const handleShow = () => setShow(true);

  

  //image file status
  const [imgFileStatus, setImgFileStatus] = useState(false)

  //preview
  const [preview, setPreview] = useState(addimage)

  useEffect(() => {
    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {
      setImgFileStatus(true)
      //convert image to url temperorly 
      setPreview(URL.createObjectURL(projectDetails.projectImg))

    }
    else {
      setImgFileStatus(false)
      setProjectDetails({ ...projectDetails, projectImg: "" })
      setPreview(addimage)
    }

  }, [projectDetails.projectImg])

  const handleUpload = async  () => {
    const { title, languages, github, website, overView, projectImg } = projectDetails
    if (title && languages && github && website && overView && projectImg) {
      //do api call to upload project data
      //since it contains media file the content type is "multipart" or "form data" 

      //token also should be passed to recognize which user reqested as req header as the data is confidential

      //to create form data create object of class formdata

      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overView", overView)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        try{
          const result=await addProject(reqBody,reqHeader)
          if(result.status==200){
            handleClose()
            setAddResponse(result.data)

          }
          else if (result.status==406){
            toast.warning("project alreadt exists")
          }
          
        }
        catch(err){
          console.log(err);
          
        }
      }

      


    }
    else {
      toast.warning("please enter all fields")
    }
  }


  return (
    <div>
      <button onClick={handleShow} className='btn btn-primary' >+Add new project</button>

      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col-md-5">
              <label >
                <input type="file" className='d-none' onChange={(e) => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} />
                <img className='img-fluid' src={preview} alt="" />

              </label>
              {!imgFileStatus && <p style={{ fontSize: "12px" }} className='fw-bold text-light'>*Upload only the following file type  (.png .svg .jpg) </p>}

            </div>
            <div className="col-md-7">
              <FloatingLabel
                controlId="floatingInput"
                label="Project Name "
                className="mb-1"
              >
                <Form.Control type="text" placeholder="Project Name" onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Languages Used "
                className="mb-1"
              >
                <Form.Control type="text" placeholder="languages" onChange={(e) => setProjectDetails({ ...projectDetails, languages: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project github link"
                className="mb-1"
              >
                <Form.Control type="text" placeholder="github link" onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project website link"
                className="mb-1"
              >
                <Form.Control type="text" placeholder="websiter link" onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </FloatingLabel>

            </div>
          </div>
          <FloatingLabel
            controlId="floatingInput"
            label="Project overview"
            className="mb-1"
          >
            <Form.Control type="text" placeholder="overView" onChange={(e) => setProjectDetails({ ...projectDetails, overView: e.target.value })} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Add