import React, { useState } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';


import { Container, Row, Col } from 'reactstrap';

import axios from 'axios';

import { BASE_URL } from "./../utils/config";

import '../styles/forgot-password.css';

const ForgotPassword = () => {
    const [credentials, setCredentials] = useState({
        email: "",
    });

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (credentials.email.trim() === "") {
            setMessage("Vui lòng nhập email!");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        try {
            const res = await axios.post(`${BASE_URL}/auth/forgotpassword`, credentials);
            console.log(res);
            setMessage("Email đã được gửi đi.");
            setShowMessage(true);
            setCredentials(prev => ({ ...prev, email: "" }));
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        catch (err) {
            console.log(err);
            setMessage("User không tồn tại. Vui lòng nhập đúng email của bạn đã đăng ký");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    };


    return (
        <> 
            <Container>
                <Row>
                    <Col lg={10} className="mx-auto text-center">
                        <div className="forgot__password-form">
                            <div className="login__form">
                                <h2>Quên mật khẩu</h2>
                                <p>Vui lòng nhập email để tìm kiếm tài khoản của bạn</p>
                                {showMessage && (
                                    <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
                                        {message}
                                    </div>
                                )}
                                <Form>
                                    <FormGroup>
                                        <input type="email" placeholder="Nhập email vào đây" required id="email" value={credentials.email} onChange={handleChange} />
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth__btn" type="submit" onClick={handleSubmit}>Gửi email</Button>
                                    <p><Link to='/login'>Hủy</Link></p>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ForgotPassword;
