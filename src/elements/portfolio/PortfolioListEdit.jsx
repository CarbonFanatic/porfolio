import React, { Component, useEffect, useState} from "react";
import axios from 'axios';
import {API_ENDPOINT} from '../../config'
import {Button} from "react-bootstrap"
import EditProjectPopup from "../../component/Popups/EditProjectPopup";
import DeleteProjectPopup from "../../component/Popups/DeletePopups/DeleteProjectPopup";
import ViewProjectPopup from "../../component/Popups/ViewProjectPopup";

export default function PortfolioList(){
    const [porfolio,setPortfolio]=useState([])
    const [openProjectEditPopup, setOpenProjectEditPopup] = useState(false);
    const [openProjectDeletePopup, setOpenProjectDeletePopup] = useState(false);
    const [openProjectPopup, setOpenProjectPopup] = useState(false);

    const accessToken = localStorage.getItem('token');
    const [project, setProject] = useState("");

    const authAxios = axios.create({
        baseURL: API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${accessToken}`
          },
        
        });
        
        useEffect(() => {
            const GetProj = async () => {
              try {
                const result = await authAxios.get(`/Projects`);
                setPortfolio(result.data);
                
              }
              catch (err) {
                console.log(err.message);
              }
            }
            GetProj();
            // this useEffect is called page is loaded
          }, []); 
          useEffect(() => {
        }, [porfolio]);
     

        const list = porfolio.slice(0 );
        return(
            <React.Fragment> 
                {list.map((value , index) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="portfolio text-center mt--40">
                       
                            <div className="thumbnail-inner" id={index} onClick={(e) =>{console.log('test');setOpenProjectPopup(true);setProject(porfolio[e.target.id])}}>
                                <div className={`thumbnail" style="background-image: url(${value.imageUrl})`}><img className={`thumbnail"`} src={value.imageUrl} alt="About Images"/></div>
                                <div className={`bg-blr-image" style="background-image: url(${value.imageUrl})"`}><img className={`bg-blr-image"`} src={value.imageUrl} alt="About Images"/></div>
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <p style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>{value.category}</p>
                                    <h4 style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>{value.title}</h4>
                                    {value.link
                                    ?<div className="portfolio-button"> <a className="rn-btn" href={value.link}>Go to project</a></div>
                                    :<></>
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'30px'}}>
                        <Button id={index} onClick={(e) =>{ setOpenProjectEditPopup(true);setProject(porfolio[e.target.id]);}} variant="dark">Edit</Button>{' '}  
                        <Button id={index} onClick={(e) =>{ setOpenProjectDeletePopup(true);setProject(porfolio[e.target.id]);}} variant="danger">Delete</Button>
                        </div>
                    </div>
                ))}
                <EditProjectPopup
            openProjectEditPopup={openProjectEditPopup}
            setOpenProjectEditPopup={setOpenProjectEditPopup}
            project={project}
            >
            
            </EditProjectPopup>
            <DeleteProjectPopup
            openProjectDeletePopup={openProjectDeletePopup}
            setOpenProjectDeletePopup={setOpenProjectDeletePopup}
            project={project}
            >
            
            </DeleteProjectPopup>
            <ViewProjectPopup
            openProjectPopup={openProjectPopup}
            setOpenProjectPopup={setOpenProjectPopup}
            project={project}
            >
            
            </ViewProjectPopup>
            </React.Fragment>
        )
    }
