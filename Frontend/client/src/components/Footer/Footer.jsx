import React from "react";
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/TOURVIET2.png';
import GooglePlay from '../../assets/images/googleplay.png';

const quick__links = [
    {
        path: '/home',
        display: 'Trang chủ'
    },
    {
        path: '/about',
        display: 'Giới thiệu'
    },
    {
        path: '/tours',
        display: 'Đặt Tour'
    }
];

const quick__links2 = [
    {
        path: '/purchase_list',
        display: 'Danh sách giao dịch'
    },
    {
        path: '/saved-tours',
        display: 'Đã lưu'
    },
    {
        path: '/edit-profile',
        display: 'Chỉnh sửa hồ sơ'
    }
]

const socialLinks = [
    {
        icon: 'ri-youtube-line',
        url: 'https://www.youtube.com',
    },
    {
        icon: 'ri-github-fill',
        url: 'https://github.com',
    },
    {
        icon: 'ri-facebook-circle-line',
        url: 'https://www.facebook.com',
    },
    {
        icon: 'ri-instagram-line',
        url: 'https://www.instagram.com',
    }
];



const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    const year = new Date().getFullYear();

    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="3">
                    <div className="logo" onClick="">
                        <Link to="/home" className="logo" onClick={scrollToTop}>
                            <img src={logo} alt="" />
                        </Link>
                        <br />
                        <div><h5 className="footer__link-title">Theo dõi chúng tôi trên</h5></div>
                        <br />
                        <div className="social__links d-flex align-items-center gap-4" onClick={scrollToTop}>
                            {socialLinks.map((link, index) => (
                                <span key={index}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        <i className={link.icon}></i>
                                    </a>
                                </span>
                            ))}
                        </div>
                    </div>
                </Col>

                <Col lg='2'>
                    <h5 className="footer__link-title">Khám phá</h5>
                    <ListGroup className="footer__quick-links">
                        {
                            quick__links.map((item, index) => (
                                <ListGroupItem key={index} className='ps-0 border-0' onClick={scrollToTop}>
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg='2'>
                    <h5 className="footer__link-title">Khác</h5>

                    <ListGroup className="footer__quick-links">
                        {
                            quick__links2.map((item, index) => (
                                <ListGroupItem key={index} className='ps-0 border-0' onClick={scrollToTop}>
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg='3'>
                    <h5 className="footer__link-title">Liên hệ</h5>

                    <ListGroup className="footer__quick-links">
                        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>

                            <h6 className="mb-0 d-flex align-items-center gap-2">
                                <span>
                                    <i class="ri-map-pin-line"></i>
                                </span>
                                Địa chỉ:
                            </h6>

                            <p className="mb-2">310/56 Pham Van Chieu</p>
                        </ListGroupItem>
                        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>

                            <h6 className="mb-0 d-flex align-items-center gap-2">
                                <span>
                                    <i class="ri-mail-line"></i>
                                </span>
                                Email:
                            </h6>

                            <p className="mb-2">TrinhSAD@gmail.com</p>
                        </ListGroupItem>
                        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>

                            <h6 className="mb-0 d-flex align-items-center gap-2">
                                <span>
                                    <i class="ri-phone-fill"></i>
                                </span>
                                Phone:
                            </h6>

                            <p className="mb-2">0944204104</p>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col lg="2">
                    <ListGroup className="footer__quick-links">
                        <h5 className="footer__link-title">Tải ứng dụng TourViet</h5>
                        <ListGroupItem className='google__play-image ps-0 border-0 d-flex align-items-center gap-3'>
                            <img src={GooglePlay} alt="" />
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col lg="12" className="text-center pt-5">
                    <p className="copyright">Copyright © {year}, producer by TRINHSAD RAPPER THANG 8</p>
                </Col>
            </Row>
        </Container>

    </footer>
};

export default Footer;