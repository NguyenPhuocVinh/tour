

import React from "react";
import './newsletter.css'
import { Container, Row, Col } from "reactstrap";
import AppImage from '../assets/images/App.jpg'
import GooglePlay from '../assets/images/googleplay.png'

const Newsletter = () => {
    return <section className="newsletter">
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="newsletter__content">
                        <h2>Luôn cập nhật các mẹo du lịch, ưu đãi và khuyến mãi mới nhất</h2>

                        <div className="newsletter__input">
                            <i class="ri-mail-line"></i>
                            <input type="email" placeholder='Địa chỉ email của bạn' />
                            <button className="btn newsletter__btn">Đăng ký tin</button>
                        </div>
                        <h5>Có chuyến đi mơ ước trong tầm tay bạn. Tải xuống ứng dụng.</h5>
                        <img src={GooglePlay} alt="" />
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={AppImage} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Newsletter;
