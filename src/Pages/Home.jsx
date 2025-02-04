import React, { useEffect, useState } from 'react'
import homeImage from '../assets/homeImg.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import Card from 'react-bootstrap/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { getHomeProjectApi } from '../Services/allApi';
import { toast } from 'react-toastify';
function Home() {

const[homeProjects,setHomeProjects]=useState()

const navigate=useNavigate()

    useEffect(() => {
     getHomeProjects()
    }, [])

    const getHomeProjects=async()=>{
        try{
            const result=await getHomeProjectApi()
            if(result.status==200){
                setHomeProjects(result.data)

            }
            
        }
        catch(err){
            console.log(err);
            
        }
    }

    const handleProject=(e)=>{
        e.preventDefault()
        
        if(sessionStorage.getItem("token")){
            navigate('/projects')
        }
        else{


            setTimeout(() => {
                navigate('/login')
            }, 2000);
            toast.warning("please login")

        }
    }
    
    return (

        <div>
    <Header/>

            <div className='container d-flex justify-content-ceneter' style={{ marginTop: "170px" }}>
                <div className='row '>
                    <div className="col-md-6 ">
                        <h2><i className='fa-brands fa-docker text-primary'></i> Project fair</h2>
                        <p >
                            One top destination where you can add and manage all your projects as well as access all the projects available in our website. So waht are you waiting for?
                        </p>
                        {
                            sessionStorage.getItem("token")
                            ?<Link to={'/dashboard'} className='btn  btn-primary'>Manage your projects</Link>
                            :<Link to={'/login'} className='btn  btn-primary'>Start to Explore</Link>
                        }
                        
                        
                    </div>
                    <div className="col-md-6 ">
                        <img src={homeImage}  alt="" className='img-fluid m-auto' />
                    </div>
                </div>
            </div>
            <div className='mt-5 text-center'>
                <h2 className=''>Explore our projects</h2>
                <marquee behavior="" direction="">
                    <div className='d-flex my-3'>
                        {homeProjects?.length>0 &&
                        homeProjects?.map(project=>
                            (
                            <div className='me-2'>
                            <ProjectCard displayData={project} />
                        </div>
                        ))}
                    </div>
                </marquee>

                <Link to={'/projects'} className='btn-link' onClick={(e)=>handleProject(e)} > Click here to view more products </Link>

                <div className='mt-5'>
                    <h2 className='text-center'>Our Testimonals</h2>
                   <div className='d-flex justify-content-center mb-5'>
                        <div className='row w-100 '>
                            <div className="col-md-4  d-flex justify-content-center mb-2">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img className='m-auto mt-1 rounded-circle w-50'  variant="top" src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />
                                    <Card.Body>
                                        <Card.Title>Max miller</Card.Title>
                                        <Card.Text>
                                          <div>  
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            
                                          </div>
                                          
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-4 text-center d-flex justify-content-center mb-2">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img className='m-auto mt-1 rounded-circle w-50' variant="top" src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid" />
                                    <Card.Body>
                                        <Card.Title>Luna teslla</Card.Title>
                                        <Card.Text>
                                        <div>  
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            
                                          </div>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-4  d-flex justify-content-center mb-2">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img className='m-auto mt-1 rounded-circle w-50'  variant="top" src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg" />
                                    <Card.Body>
                                        <Card.Title>Amir khan</Card.Title>
                                        <Card.Text>
                                        <div>  
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            <i className='fa-solid fa-star text-warning'></i>
                                            
                                          </div>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                   </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home