import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addimage from '../assets/addimage.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import serverURL  from '../Services/serverURL';
import { toast } from 'react-toastify';
import { editProjectApi } from '../Services/allApi';
import { editResponseContext } from '../context/ContextApi';

function Edit({project}) {
    const{editResponse,setEditResponse}=useContext(editResponseContext)
  
        const [projectDetails, setProjectDetails] = useState({id:project?._id ,title: project?.title, languages: project?.languages, github: project?.github, website: project?.website, overView: project?.overView, projectImg: "" })

        const [show, setShow] = useState(false);
    
        const handleClose = () => {
          setShow(false)

        };
        const handleShow = () => {

          setShow(true);
        }

          const [imgFileStatus, setImgFileStatus] = useState(false)
        
          //preview
          const [preview, setPreview] = useState("")
        
          useEffect(() => {
            if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {
              setImgFileStatus(true)
              //convert image to url temperorly
              setPreview(URL.createObjectURL(projectDetails.projectImg))
        
            }
            else {
              setPreview("")
              setImgFileStatus(false)
              setProjectDetails({ ...projectDetails, projectImg: "" })
            }
        
          }, [projectDetails.projectImg])

       const handleupdate=async()=>{
        const {id,title,languages,github,website,overView,projectImg}=projectDetails
        if(title && languages && github&& website&& overView){
         
          const reqBody=new FormData()
          reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("github",github)
          reqBody.append("website",website)
          reqBody.append("overView",overView)

          if(preview){
          reqBody.append("projectImg",projectImg)
          }
          else{
            reqBody.append("projectImg",project?.projectImg)

          }

          const token=sessionStorage.getItem("token")
          if(token){
            const reqHeader={
              "Content-Type":preview?"multipart/form-data":"application/json",
              "Authorization":`Bearer ${token}`
            } 
           
            try{

             const result= await editProjectApi(id,reqBody,reqHeader) 

             
             if(result.status==200){
              setEditResponse(result.data)
              handleClose()
             }
            

            }
            catch(err){
              console.log(err);
              
            }     
          }

        }
        else{
          toast.warning("please enter all fields")
        }
       }

      
  return (
    <div>
<i class="fa-regular fa-pen-to-square"  onClick={handleShow} style={{cursor:"pointer"}}></i>
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
                <img className='img-fluid' src={preview?preview:`${serverURL}/uploads/${project?.projectImg}`} alt="" />

              </label>
              {!imgFileStatus && <p style={{ fontSize: "12px" }} className='fw-bold text-light'>*Upload only the following file type  (.png .svg .jpg) </p>}

            </div>
            <div className="col-md-7">
              <FloatingLabel
                controlId="floatingInput"
                label="Project Name "
                className="mb-1"
              >
                <Form.Control value={projectDetails.title} type="text" placeholder="Project Name" onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Languages Used "
                className="mb-1"
              >
                <Form.Control  value={projectDetails.languages} type="text" placeholder="languages" onChange={(e) => setProjectDetails({ ...projectDetails, languages: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project github link"
                className="mb-1"
              >
                <Form.Control value={projectDetails.github} type="text" placeholder="github link" onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project website link"
                className="mb-1"
              >
                <Form.Control value={projectDetails.website} type="text" placeholder="websiter link" onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </FloatingLabel>

            </div>
          </div>
          <FloatingLabel
            controlId="floatingInput"
            label="Project overview"
            className="mb-1"
          >
            <Form.Control value={projectDetails.overView} type="text" placeholder="overView" onChange={(e) => setProjectDetails({ ...projectDetails, overView: e.target.value })} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleupdate} >Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Edit