import React, { Component, useEffect, useState} from "react";
import axios from 'axios';
import {API_ENDPOINT} from '../../config'
import ViewProjectPopup from "../../component/Popups/ViewProjectPopup";


export default function PortfolioList(){
    const [porfolio,setPortfolio]=useState([])
    const accessToken = localStorage.getItem('token');
    const [openProjectPopup, setOpenProjectPopup] = useState(false);
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
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" >
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
                        
                        </div>
                    </div>
                ))}
         <ViewProjectPopup
            openProjectPopup={openProjectPopup}
            setOpenProjectPopup={setOpenProjectPopup}
            project={project}
            >
            
            </ViewProjectPopup>
              
            </React.Fragment>
        )
    }
