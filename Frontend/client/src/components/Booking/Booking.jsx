import React, { useState, useEffect } from "react";
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import loginImg from '../../assets/images/login2.png';
import LoginImg2 from '../../assets/images/loginsuccess.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { BASE_URL } from "../../utils/config";

const Booking = () => {

    const currentPath = window.location.pathname;
    const paths = currentPath.split("/");
    const _id = paths[paths.length - 1];

    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUserDataFilled, setIsUserDataFilled] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/tour/${_id}`);
                setTour(res.data.tour);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTour();
    }, [_id]);

    const handleLoginClick = () => {
        localStorage.setItem("bookingRedirect", currentPath);
    };

    const [booking, setBooking] = useState({
        tourId: _id,
        fullName: '',
        email: '',
        phone: '',
        quantity: 1,
        totalAmount: tour && tour.price ? tour.price : 0,
    });

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (token === null || user === null) {
            setShowLoginUrl(true);
        } else {
            setShowLoginUrl(false);
            const getUserInfo = async () => {
                try {
                    const res = await axios.get(`${BASE_URL}/user/login`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const userData = res.data.user;
                    setBooking(prevBooking => ({
                        ...prevBooking,
                        fullName: userData.fullName || '',
                        email: userData.email || '',
                        phone: userData.phone || ''
                    }));
                    setIsUserDataFilled(true);
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            };
            getUserInfo();
        }
    }, []);

    const [showLoginUrl, setShowLoginUrl] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();

        const formattedBooking = {
            ...booking,
            price: tour ? tour.price : 0,
        };

        try {
            const res = await axios.post(
                `${BASE_URL}/booking/createbooking?tourId=${_id}`,
                formattedBooking,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : '' }
                }
            );

            if (res.status === 201) {
                const bookingId = res.data.newBooking._id;
                
                window.alert("Đặt chỗ thành công. Tiếp tục thanh toán.");
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                navigate(`/payment/${bookingId}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (tour && tour.price) {
            setBooking(prev => ({
                ...prev,
                totalAmount: tour.price * prev.quantity
            }));
        }
    }, [tour]);

    const handleIncrease = () => {
        setBooking(prev => ({
            ...prev,
            quantity: prev.quantity + 1,
            totalAmount: tour && tour.price ? tour.price * (prev.quantity + 1) : prev.totalAmount,
        }));
    };

    const handleDecrease = () => {
        if (booking.quantity > 1) {
            setBooking(prev => ({
                ...prev,
                quantity: prev.quantity - 1,
                totalAmount: tour && tour.price ? tour.price * (prev.quantity - 1) : prev.totalAmount,
            }));
        }
    };

    const handleChange = e => {
        if (isUserDataFilled) {
            return;
        }
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="booking">
                <div className="booking__check-login">
                    <h3>Đặt chỗ của tôi</h3>
                    <h6>Điền thông tin và xem lại đặt chỗ.</h6>
                    {showLoginUrl ? (
                        <div className="booking__login-url">
                            <Row>
                                <Col md="4">
                                    <div className="login__img">
                                        <img src={loginImg} alt="" />
                                    </div>
                                </Col>
                                <Col md="7">
                                    <div className="booking__login-info">
                                        <p>Đăng nhập hoặc Đăng ký sẽ dễ dàng hơn và tận hưởng ưu đãi dành riêng cho thành viên.</p>
                                        <Link to={`/login`}>
                                            <Button className="login-button" onClick={handleLoginClick}>Đăng nhập hoặc Đăng ký</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : null}
                    {!showLoginUrl && localStorage.getItem('token') ? (
                        <div className="booking__login-success">
                            <Row>
                                <Col md="4">
                                    <div className="login__img">
                                        <img src={LoginImg2} alt="" />
                                    </div>
                                </Col>
                                <Col md="7">
                                    <div className="booking__login-text">
                                        <p color="#33afaf">Chào mừng bạn quay trở lại! Hãy tận hưởng ưu đãi một cách trọn vẹn nhất.</p>
                                        <h5><FontAwesomeIcon icon={faUser} className="icon-user" /> Đã đăng nhập với tài khoản;</h5>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : null}
                </div>
                <div className="booking__form">
                    <h3>Thông tin liên hệ</h3>
                    <Form className="booking__info-form" >
                        <h6>Thông tin liên hệ (nhận vé/phiếu thanh toán)</h6>
                        <FormGroup>
                            <input type="text" placeholder="Họ và tên*" id="fullName" required onChange={handleChange} value={booking.fullName || ''} readOnly={isUserDataFilled} />
                        </FormGroup>
                        <p>như trên CMND (không dấu)</p>
                        <FormGroup>
                            <input type="email" placeholder="Email*" id="email" required onChange={handleChange} value={booking.email || ''} readOnly={isUserDataFilled} />
                        </FormGroup>
                        <p>VD: email@example.com</p>
                        <FormGroup>
                            <input type="number" placeholder="Số điện thoại*" id="phone" required onChange={handleChange} value={booking.phone || ''} readOnly={isUserDataFilled} />
                        </FormGroup>
                        <p>VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động</p>
                    </Form>
                </div>

                <div className="booking__bottom">
                    <h3>Tóm tắt</h3>
                    <ListGroup className="booking__bottom-total">
                        <ListGroupItem className="total__price border-0 px-0">
                            <Row>
                                <Col md="6">Giá bạn trả:</Col>
                                <Col md="6" className="price__booking">
                                    <p>{VND.format(tour ? tour.price : 0)}</p>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="total__quantity border-0 px-0">
                            <Row>
                                <Col md="6">Số lượng:</Col>
                                <Col md="6">
                                    <Button className="button__quantity" onClick={handleDecrease}>-</Button>
                                    {booking.quantity}
                                    <Button className="button__quantity" onClick={handleIncrease}>+</Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <hr />
                        <ListGroupItem className="total__booking border-0 px-0 total">
                            <Row>
                                <Col md="6">Tổng cộng:</Col>
                                <Col md="6" className="total__booking-price">
                                    <p>{VND.format(booking.totalAmount)}</p>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </div>
                <br />
                <div className="button__booking-payment" onClick={handleClick}><Button className="button__continue">Tiếp tục</Button></div>
            </div>
        </>
    );
};

export default Booking;
