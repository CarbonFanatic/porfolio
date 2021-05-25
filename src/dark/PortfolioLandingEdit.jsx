import React, { useEffect, useState } from 'react';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Helmet from "../component/common/Helmet";
import TextLoop from "react-text-loop";
import HeaderThree from "../component/header/HeaderThree";
import FooterTwo from "../component/footer/FooterTwo";
import ContactThree from "../elements/contact/ContactThree";
import PortfolioList from "../elements/portfolio/PortfolioListEdit";
import { MdWork } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import axios from 'axios';
import { Button } from "react-bootstrap"
import { API_ENDPOINT } from '../config'
import EditIntroPopup from "../component/Popups/EditIntroPopup";
import EditAboutPopup from "../component/Popups/EditAboutPopup";

import EditWorkPopup from "../component/Popups/EditWorkPopup";
import DeleteWorkPopup from "../component/Popups/DeletePopups/DeleteWorkPopup"
import AddWorkPopup from "../component/Popups/AddPopups/AddWorkPopup"


import EditSkillPopup from "../component/Popups/EditSkillsPopup";
import DeleteSkillPopup from "../component/Popups/DeletePopups/DeleteSkillsPopup"
import AddSkillPopup from "../component/Popups/AddPopups/AddSkillsPopup"

import EditSchoolPopup from "../component/Popups/EditSchoolPopup";
import DeleteSchoolPopup from "../component/Popups/DeletePopups/DeleteSchoolPopup"
import AddSchoolPopup from "../component/Popups/AddPopups/AddSchoolPopup"

import AddProjectPopup from "../component/Popups/AddPopups/AddProjectPopup"
import { Link } from 'react-router-dom';
const SlideList = [
    {
        textPosition: 'text-left',
        category: 'Welcome to my World',
        description: '',
        buttonText: '',
        buttonLink: ''
    }
]


const PortfolioLanding = () => {

    const [introduction, setIntroduction] = useState([])
    const [myRoles, setMyRoles] = useState([])
    const [aboutMe, setAboutMe] = useState("")
    const [workExperience, setWorkExperience] = useState([])
    const [education, setEducation] = useState([])
    const [skills, setSkills] = useState([])
    const [openIntroEditPopup, setOpenIntroEditPopup] = useState(false);
    const [openAboutEditPopup, setOpenAboutEditPopup] = useState(false);
    const [openSchoolEditPopup, setOpenSchoolEditPopup] = useState(false);
    const [openSchoolDeletePopup, setOpenSchoolDeletePopup] = useState(false);
    const [openWorkEditPopup, setOpenWorkEditPopup] = useState(false);
    const [openWorkDeletePopup, setOpenWorkDeletePopup] = useState(false);
    const [openWorkAddPopup, setOpenWorkAddPopup] = useState(false);

    const [openSkillEditPopup, setOpenSkillEditPopup] = useState(false);
    const [openSkillDeletePopup, setOpenSkillDeletePopup] = useState(false);
    const [openSkillAddPopup, setOpenSkillAddPopup] = useState(false);

    const [openProjectAddPopup, setOpenProjectAddPopup] = useState(false);
    const [openSchoolAddPopup, setOpenSchoolAddPopup] = useState(false);
    const [work, setWork] = useState("");
    const [mySkills, setMySkills] = useState("");

    const accessToken = localStorage.getItem('token');

    const [school, setSchool] = useState("");



    const authAxios = axios.create({
        baseURL: API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },

    });

    const LogOut = async () => {

        localStorage.removeItem("token")
        window.location.href = "/";
    }
    useEffect(() => {
        const Getinfo = async () => {
            try {
                const result = await authAxios.get(`/Introduction`);
                const result2 = await authAxios.get(`/AboutMe`);
                const result3 = await authAxios.get(`/Career`);
                const result4 = await authAxios.get(`/Education`);
                const result5 = await authAxios.get(`/Skill`);

                setAboutMe(result2.data[0]);
                setIntroduction(result.data[0]);
                setMyRoles(result.data[0].myRoles);
                setWorkExperience(result3.data);
                setEducation(result4.data)
                setSkills(result5.data);

            }
            catch (err) {
                console.log(err.message);
            }
        }
        Getinfo();
        // this useEffect is called page is loaded
    }, []);
    useEffect(() => {
        if (!accessToken) {
            window.location.href = "/";

        }
    }, [introduction, myRoles]);

    useEffect(() => {
    }, [openIntroEditPopup]);


    let title = 'About Me'
    const roleList = myRoles.slice(0)
    const careerList = workExperience.slice(0);
    const educationList = education.slice(0);
    const skillsList = skills.slice(0);
    const introtest = introduction;
    const abouttest = aboutMe;




    return (
        <div className="active-dark">
            <Helmet pageTitle="Portfolio Landing" />

            <HeaderThree homeLink="/" logo="symbol-dark" color="color-black" />
            <div id="home" className="fix">
                <div className="slider-wrapper">
                    {/* Start Single Slide */}
                    {SlideList.map((value, index) => (
                        <div className="slide personal-portfolio-slider slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image bg_image--25" key={index}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={`inner ${value.textPosition}`}>
                                            {value.category ? <span>{value.category}</span> : ''}
                                            <div>
                                                <Button onClick={() => setOpenIntroEditPopup(true)} variant="dark">Edit</Button>
                                                <Button style={{ marginLeft: '40%' }} onClick={() => LogOut()} variant="danger">Log out</Button>{' '}
                                            </div>
                                            <h1 className="title">{introduction.title} <br />
                                                <TextLoop >
                                                    <span>{roleList[0]}</span>
                                                    <span>{roleList[1]}</span>
                                                    <span>{roleList[2]}</span>
                                                </TextLoop>{" "}
                                            </h1>
                                            <h2>{introduction.location}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* End Single Slide */}
                </div>
            </div>
            {/* End Slider Area   */}

            {/* Start About Area */}
            <div id="about" className="fix">
                <div className="about-area ptb--120  bg_color--1">
                    <div className="about-wrapper">
                        <div className="container">
                            <div className="row row--35 align-items-center">
                                <div className="col-lg-5">
                                    <div className="thumbnail">
                                        <img className="w-100" src={aboutMe.imageUrl} alt="About me Image" />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="about-inner inner">
                                        <div className="section-title">
                                            <h2 className="title">{title}</h2>
                                            <Button onClick={() => setOpenAboutEditPopup(true)} variant="dark">Edit</Button>{' '}
                                            <p className="description">{aboutMe.description}</p>
                                        </div>
                                        <div className="row mt--30">
                                            <Link to="/assets/cv_christos.docx" style={{color:'orangered'}} target="_blank" download> Download My CV</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* End About Area */}
            {/* Start Service Area  */}
            <div id="career" className="fix ">
                <div className="ptb--120  bg_color--1" >
                    <div className="about-wrapper">
                        <div className="container">
                            <Button onClick={() => setOpenWorkAddPopup(true)} variant="success">Add Work Experience</Button>{' '}

                            <div class="col-lg-16">
                                <div className="row row--35 align-items-center">
                                    <h3 ><MdWork /> Work Experience</h3>

                                </div>
                                {careerList.map((item, index) => (
                                    <div >
                                        <Button id={index} onClick={(e) => { setOpenWorkEditPopup(true); setWork(workExperience[e.target.id]); }} variant="dark">Edit</Button>{' '}
                                        <Button id={index} onClick={(e) => { setOpenWorkDeletePopup(true); setWork(workExperience[e.target.id]); }} variant="danger">Delete</Button>
                                        <h3 style={{ marginLeft: '25px', fontSize: '24px' }}>{item.workplaceName}</h3>
                                        <h4 style={{ marginLeft: '60px' }}>{item.role}  -  {item.activeYears}</h4>
                                        <h5 style={{ marginLeft: '25px', marginBottom: '50px' }}>{item.description}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Service Area  */}
            {/* Start Education Area */}
            <div id="education" className="fix ">

                <div className="ptb--120  bg_color--1" >
                    <div className="education-wrapper">

                        <div className="container">
                            <Button onClick={() => setOpenSchoolAddPopup(true)} variant="success">Add Education</Button>{' '}

                            <div class="col-lg-16">

                                <div className="row row--35 align-items-center">
                                    <h3 ><ImBooks /> Education</h3>

                                    {educationList.map((item, index) => (
                                        <div >
                                            <Button id={index} onClick={(e) => { setOpenSchoolEditPopup(true); setSchool(education[e.target.id]); }} variant="dark">Edit</Button>{' '}
                                            <Button id={index} onClick={(e) => { setOpenSchoolDeletePopup(true); setSchool(education[e.target.id]); }} variant="danger">Delete</Button>
                                            <h3 style={{ marginLeft: '60px', fontSize: '24px' }}>{item.schoolName}</h3>
                                            <h4 style={{ marginLeft: '80px' }}>{item.program} -  {item.activeyears}</h4>
                                            <h5 style={{ marginLeft: '60px' }}>{item.description}</h5>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Education  Area */}

            {/* Start Portfolio Area */}
            <div id="projects" className="fix">
                <div className="portfolio-area ptb--120 bg_color--1">
                    <div className="portfolio-sacousel-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                                        <h2 className="title">My Latest Project</h2>
                                        <Button onClick={() => setOpenProjectAddPopup(true)} variant="success">Add Project</Button>{' '}

                                        <p>Here are some of my latest projects</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <PortfolioList />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* End Portfolio Area */}
            {/* Start skills Area  */}
            <div id="skills" className="fix ">
                <div className="ptb--120  bg_color--1" >
                    <div className="skills-wrapper">
                        <div className="container">
                            <Button onClick={() => setOpenSkillAddPopup(true)} variant="success">Add a Skill</Button>{' '}

                            <div class="col-lg-16">
                                <div className="row row--35 align-items-center">
                                    <h3 ><MdWork /> Skills</h3>

                                </div>
                                {skillsList.map((item, index) => (
                                    <div >
                                        <Button id={index} onClick={(e) => { setOpenSkillEditPopup(true); setMySkills(skills[e.target.id]); }} variant="dark">Edit</Button>{' '}
                                        <Button id={index} onClick={(e) => { setOpenSkillDeletePopup(true); setMySkills(skills[e.target.id]); }} variant="danger">Delete</Button>
                                        <h3 style={{ marginLeft: '25px', fontSize: '24px' }}>{item.skillName}</h3>
                                        <h5 style={{marginLeft: '60px' , marginBottom: '50px' }}>{item.description}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Service Area  */}
            {/* Start Contact Area */}
            <div id="contact" className="fix">
                <div className="rn-contact-area ptb--120 bg_color--1">
                    <ContactThree contactImages={aboutMe.imageUrl} contactTitle="Contact Me" />
                </div>
            </div>
            {/* End COntact Area */}

            <FooterTwo />
            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}

            <EditIntroPopup
                openIntroEditPopup={openIntroEditPopup}
                setOpenIntroEditPopup={setOpenIntroEditPopup}
                introduction={introtest}
            >

            </EditIntroPopup>

            <EditAboutPopup
                openAboutEditPopup={openAboutEditPopup}
                setOpenAboutEditPopup={setOpenAboutEditPopup}
                aboutMe={abouttest}
            >

            </EditAboutPopup>

            <EditWorkPopup
                openWorkEditPopup={openWorkEditPopup}
                setOpenWorkEditPopup={setOpenWorkEditPopup}
                myWork={work}
            >
            </EditWorkPopup>
            <DeleteWorkPopup
                openWorkDeletePopup={openWorkDeletePopup}
                setOpenWorkDeletePopup={setOpenWorkDeletePopup}
                myWork={work}>
            </DeleteWorkPopup>
            <AddWorkPopup
                openWorkAddPopup={openWorkAddPopup}
                setOpenWorkAddPopup={setOpenWorkAddPopup}>
            </AddWorkPopup>


            <EditSchoolPopup
                openSchoolEditPopup={openSchoolEditPopup}
                setOpenSchoolEditPopup={setOpenSchoolEditPopup}
                school={school}
            >

            </EditSchoolPopup>
            <DeleteSchoolPopup
                openSchoolDeletePopup={openSchoolDeletePopup}
                setOpenSchoolDeletePopup={setOpenSchoolDeletePopup}
                school={school}
            >

            </DeleteSchoolPopup>
            <AddSchoolPopup
                openSchoolAddPopup={openSchoolAddPopup}
                setOpenSchoolAddPopup={setOpenSchoolAddPopup}
            >

            </AddSchoolPopup>
            <AddProjectPopup
                openProjectAddPopup={openProjectAddPopup}
                setOpenProjectAddPopup={setOpenProjectAddPopup}>
            </AddProjectPopup>

            <EditSkillPopup
                openSkillEditPopup={openSkillEditPopup}
                setOpenSkillEditPopup={setOpenSkillEditPopup}
                mySkill={mySkills}
            >
            </EditSkillPopup>
            <DeleteSkillPopup
                openSkillDeletePopup={openSkillDeletePopup}
                setOpenSkillDeletePopup={setOpenSkillDeletePopup}
                mySkill={mySkills}>
            </DeleteSkillPopup>
            <AddSkillPopup
                openSkillAddPopup={openSkillAddPopup}
                setOpenSkillAddPopup={setOpenSkillAddPopup}>
            </AddSkillPopup>

        </div>
    )
}

export default PortfolioLanding;
