import React, { useState } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "./../utils/config";

import { Container, Row, Col } from 'reactstrap';

import '../styles/change-password.css';

const ChangePassword = () => {


    const [credentials, setCredentials] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));

        if (e.target.id === "newPassword" && e.target.value === credentials.currentPassword) {
            setMessage("Mật khẩu mới phải khác mật khẩu hiện tại.");
            setShowMessage(true);
        } else {
            setShowMessage(false);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        if (credentials.newPassword !== credentials.confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp.");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 1500);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(`${BASE_URL}/auth/change-password`, credentials, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res);
            setMessage("Mật khẩu đã được thay đổi.");
            setShowMessage(true);
            
            
            setTimeout(() => {
                setShowMessage(false);
            }, 1500);
            setCredentials({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (err) {
            console.log(err);
            setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
            setShowMessage(true);
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col lg={8} className="mx-auto text-center">
                        <div className="change__password-form">
                            <div className="login__form">
                                <h2>Đổi mật khẩu</h2>
                                {showMessage && (
                                    <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
                                        {message}
                                    </div>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input type="password" placeholder="Mật khẩu hiện tại" required id="currentPassword" value={credentials.currentPassword} onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder="Mật khẩu mới" required id="newPassword" value={credentials.newPassword} onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder="Xác nhận mật khẩu mới" required id="confirmPassword" value={credentials.confirmPassword} onChange={handleChange} />
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth__btn" type="submit">Xác nhận</Button>
                                    <p><Link to='/home'>Hủy</Link></p>
                                </Form>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChangePassword;
