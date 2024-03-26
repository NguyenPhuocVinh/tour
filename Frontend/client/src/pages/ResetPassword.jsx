import React, { useState, useEffect } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Link, useParams } from 'react-router-dom'; // Thêm useParams để lấy params từ URL

import axios from 'axios';

import { Col } from "reactstrap";

import { BASE_URL } from "./../utils/config";


import '../styles/forgot-password.css';

const ResetPassword = () => {
    const [credentials, setCredentials] = useState({
        password: "",
        confirmPassword: "", 
    });

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const { token } = useParams(); 

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp.");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        try {
            const res = await axios.patch(`${BASE_URL}/auth/reset-password/${token}`, credentials); // Gửi token trong URL
            console.log(res);
            setMessage("Mật khẩu đã được thay đổi.");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            // Reset fields
            setCredentials(prev => ({
                ...prev,
                password: "",
                confirmPassword: "",
            }));

        } catch (err) {
            console.log(err);
            setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
            setShowMessage(true);
        }
    }

    useEffect(() => {
        // Kiểm tra nếu token tồn tại, thì có thể là trường hợp mở từ link trong email
        if (token) {
            // Thực hiện một số xử lý ở đây nếu cần
        }
    }, [token]);

    return (
        <>
            <Col lg={8} className="mx-auto text-center">
                <div className="change__password-form d-flex justify-content-center">
                    <div className="login__form">
                        <h2>Tạo mật khẩu mới</h2>
                        {showMessage && (
                            <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
                                {message}
                            </div>
                        )}
                        <Form>
                            <FormGroup>
                                <input type="password" placeholder="Mật khẩu mới" required id="password" value={credentials.password} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <input type="password" placeholder="Xác nhận mật khẩu mới" required id="confirmPassword" value={credentials.confirmPassword} onChange={handleChange} />
                            </FormGroup>
                            <Button className="btn secondary__btn auth__btn" type="submit" onClick={handleSubmit}>Xác nhận</Button>
                            <p><Link to='/login'>Hủy</Link></p>
                        </Form>
                    </div>
                </div>
            </Col>
        </>
    );
};

export default ResetPassword;
