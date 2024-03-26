import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import registerImg from "../assets/images/register.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import WelcomeImg2 from "../assets/images/welcome.png";

const Register = () => {
    // const { dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: ""
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${BASE_URL}/auth/register`,
                credentials
            );
            console.log("Registration successful:", response.data);
            window.alert("Đăng ký thành công");
            window.location.reload(navigate("/login"));
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.response && error.response.status === 400) {
                window.alert(`User with email  ${credentials.email} already exists`);
            } else {
                window.alert("Một lỗi đã xảy ra.");
            }
            console.error("Registration error:", error.response.data);
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
                                        <img src={registerImg} alt="" />
                                    </div>

                                    <div className="login__form">
                                        <h2>Đăng ký</h2>

                                        <Form onSubmit={handleClick}>
                                            <FormGroup>
                                                <input type="text" placeholder="Họ và tên" required id="fullName" onChange={handleChange} />
                                            </FormGroup>
                                            <FormGroup>
                                                <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="password-input">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Mật Khẩu"
                                                        required
                                                        id="password"
                                                        onChange={handleChange}
                                                    />
                                                    <span onClick={togglePasswordVisibility}>
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </span>
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <input type="phone" placeholder="Số Điện Thoại" required id="phone" onChange={handleChange} />
                                            </FormGroup>
                                            <Button className="btn secondary__btn auth__btn" type="submit">
                                                Tạo tài khoản
                                            </Button>
                                        </Form>
                                        <p>
                                            Already have an account? <Link to="/login">Đăng nhập</Link>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Register;
