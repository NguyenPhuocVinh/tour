

import React from "react";
import { Container, Row, Col } from "reactstrap";
import '../styles/about.css';
import Testimonials from "../components/Testimonial/Testimonials";
import ImgTourist from "../assets/images/VietNam4.png";
import ImgTourist2 from "../assets/images/VietNam5.png";
import ImgTourist3 from "../assets/images/VietNam7.jpg";
import ImgLogo from "../assets/images/TOURVIET.png";
import Newsletter from "../shared/Newsletter";

const About = () => {
    return (
        <>
            <section className="about__tour">
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="about__box">
                                <h1>FEEL THE HEIGHT</h1>
                                <h2 className="box__tourist">TET HOLIDAY IN VIETNAM</h2>

                                <p><b>Spectacular nature. Exceptional cuisine. Cultural diversity. Excellent service.</b></p>
                                <p className="box__tour ">
                                    " The picturesque travel destinations I see in travel magazines and
                                    the adventurous stories shared by globetrotters on social media inspire my wanderlust.
                                    The idea of exploring new cultures and savoring diverse cuisines from around the world fuels my passion for travel.
                                    I'm driven by the desire to create my own unforgettable experiences and collect memories in different corners of the globe.  "
                                </p>
                                <p><b>* Foundation day: </b>06/09/2023 *</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <br />

            <section >
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="about__tourist">
                                <h2>CHÀO MỪNG CÁC BẠN ĐẾN VỚI TOUr VIET</h2>
                            </div>
                            <br />
                            <div className="about__tourist_1 ">
                                <Col lg='6'>
                                    <div className="about__tourist_1_1">
                                        <img src={ImgLogo} alt="" />
                                        <p>
                                            " <b>Tour Travel</b> is a travel agency that specializes in creating unique experiences for every traveler.
                                            We are a team of travel experts who are passionate about crafting the perfect holiday for you.
                                            We are committed to providing you with the best travel experience possible. "
                                        </p>
                                    </div>
                                    <div className="tourist__img d-flex justify-content-center align-items-center">
                                        <img src={ImgTourist} alt="" />
                                    </div>
                                    <div className="tourist__img d-flex justify-content-center align-items-center">
                                        <img src={ImgTourist2} alt="" />
                                    </div>
                                    <div className="tourist__img d-flex justify-content-center align-items-center">
                                        <img src={ImgTourist3} alt="" />
                                    </div>
                                </Col>
                                <br />
                            </div>
                            <Col lg='6 d-flex flex-row-reverse'>
                                {/* <div className="about__tourist_1_2">
                                    <h2>OUR MISSION</h2>
                                    <p>
                                    " Our mission is to provide you with the best travel experience possible. 
                                    We are committed to providing you with the best travel experience possible. "
                                    </p>
                            </div>
                            <div className="tourist__img">
                                    <img src={ImgTourist} alt="" />
                            </div>
                            <div className="about__tourist_1_3">
                                    <h2>OUR MISSION</h2>
                                    <p>
                                    " Our mission is to provide you with the best travel experience possible. 
                                    We are committed to providing you with the best travel experience possible. "
                                    </p>
                            </div>
                            <div className="tourist__img">
                                    <img src={ImgTourist} alt="" />
                            </div> */}
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <h2 className="testimonial__title">Team Members</h2>
                        </Col>
                        <Col lg="12">
                            <Testimonials />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    )
};

export default About;
