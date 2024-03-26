import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "./../utils/config";
import loginImg from '../assets/images/login2.png';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import WelcomeImg from '../assets/images/welcome2.png';
import WelcomeImg2 from '../assets/images/welcome.png';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();

        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, credentials, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.setItem('token', res.data.token);

            const bookingRedirect = localStorage.getItem("bookingRedirect");
            if (bookingRedirect) {
                localStorage.removeItem("bookingRedirect");
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                setShowSuccess(true);
                navigate(bookingRedirect);
            } else {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                setShowSuccess(true);

                setTimeout(() => {
                    setShowSuccess(false);
                    if (!bookingRedirect) {
                        window.location.reload(navigate("/"));
                    }
                }, 2000);
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.response && error.response.status === 401) {
                window.alert("Email hoặc mật khẩu không đúng.");
            } else {
                window.alert("Một lỗi đã xảy ra.");
            }
            console.error("Login error:", error.response);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="m-auto">
                        {isLoggedIn ? (
                            <div className="success-form">
                                <img src={WelcomeImg2} alt="" />
                                <h2>Bạn đã đăng nhập thành công</h2>
                                <h6><Link to='/'>Trang chính</Link></h6>

                            </div>
                        ) : (
                            <div className="login__container d-flex justify-content-between">
                                <div className="login__img">
                                    <img src={loginImg} alt="" />
                                </div>
                                <div className="login__form">
                                    <h2>Đăng Nhập</h2>
                                    {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
                                    <Form onSubmit={handleClick}>
                                        <FormGroup>
                                            <input type="email" placeholder="Email " required id="email" onChange={handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="password-input">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Mật khẩu"
                                                    required
                                                    id="password"
                                                    onChange={handleChange}
                                                />
                                                <span onClick={togglePasswordVisibility}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                        </FormGroup>
                                        <Button className="btn secondary__btn auth__btn" type="submit">Đăng nhập</Button>
                                    </Form>
                                    <p>Don't have an account?<Link to='/register'>Tạo tài khoản</Link></p>
                                    <p><Link to='/forgot-password'>Quên mật khẩu?</Link></p>
                                </div>
                            </div>
                        )}
                            {showSuccess && (
                                <div className="overlay" style={{ bottom: showSuccess ? 0 : "-100%" }}>
                                    <div className="success-form">
                                        <img src={WelcomeImg} alt="" />
                                        <h2>Chào mừng bạn đến với TourViet</h2>
                                        <p>Hãy trải nghiệm những gì tốt nhất có thể tại đây.</p>
                                    </div>
                                </div>
                            )}
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}

export default Login;
