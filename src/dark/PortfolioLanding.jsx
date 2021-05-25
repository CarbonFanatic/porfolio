import React, { useEffect, useState } from 'react';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Helmet from "../component/common/Helmet";
import TextLoop from "react-text-loop";
import HeaderThree from "../component/header/HeaderThree";
import FooterTwo from "../component/footer/FooterTwo";
import ContactThree from "../elements/contact/ContactThree";
import PortfolioList from "../elements/portfolio/PortfolioList";
import BlogContent from "../elements/blog/BlogContent";
import { MdWork } from "react-icons/md";
import { ImBooks } from "react-icons/im"
import axios from 'axios';
import { API_ENDPOINT } from '../config'
import { Link  } from 'react-router-dom';

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

    const accessToken = localStorage.getItem('token');


    const authAxios = axios.create({
        baseURL: API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${accessToken}`

        },

    });

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
    }, [introduction, myRoles]);

    let title = 'About Me'
    const roleList = myRoles.slice(0)
    const careerList = workExperience.slice(0);
    const educationList = education.slice(0);
    const skillsList = skills.slice(0);
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
                            <div class="col-lg-16">
                                <div className="row row--35 align-items-center">
                                    <h3 ><MdWork /> Work Experience</h3>
                                    </div>
                                    {careerList.map(item => (

                                    <div >
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
                            <div class="col-lg-16">
                                <div className="row row--35 align-items-center">
                                    <h3 ><ImBooks /> Education</h3>
                                    {educationList.map(item => (
                                        <div >
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
            {/* Start of Skills Area*/}
            <div id="skills" className="fix ">
                <div className="ptb--120  bg_color--1" >
                    <div className="skills-wrapper">
                        <div className="container">
                            <div class="col-lg-16">
                                <div className="row row--35 align-items-center">
                                    <h3 ><MdWork /> Skills</h3>
                                    </div>
                                    {skillsList.map(item => (

                                    <div >
                                        <h3 style={{ marginLeft: '25px', fontSize: '24px' }}>{item.skillName}</h3>
                                        <h4 style={{ marginLeft: '60px' }}>{item.description}</h4>
                                    </div>
                                    ))}                                              
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

        </div>
    )
}

export default PortfolioLanding;
