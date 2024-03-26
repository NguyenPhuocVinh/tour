import React, { useState, useEffect } from "react";
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "./../utils/config";

import { Container, Row, Col } from 'reactstrap';

import '../styles/change-password.css';


const EditProfile = () => {
    const [isUserDataFilled, setIsUserDataFilled] = useState(false);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isInfoChanged, setIsInfoChanged] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = e => {
        if (e) {
            e.preventDefault();
        }
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
        setIsInfoChanged(true);
    }

    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    const getUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASE_URL}/user/login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = res.data.user;
            setCredentials(prevEditProfile => ({
                ...prevEditProfile,
                fullName: userData.fullName || '',
                email: userData.email || '',
                phone: userData.phone || ''
            }));
            setIsUserDataFilled(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleSubmit = async e => {
        if (e) {
            e.preventDefault();
        }
        if (!isInfoChanged) {
            toggleConfirmation();
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(`${BASE_URL}/auth/updateUser`, credentials, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res);
            setMessage("Thông tin đã được cập nhật thành công.");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                window.location.reload(navigate("/"));
            }, 2000);
        } catch (err) {
            console.log(err);
            setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
            setShowMessage(true);
        }
    }

    const handleConfirmationYes = () => {
        toggleConfirmation();
        setIsInfoChanged(true);
        setMessage("Thông tin đã được cập nhật thành công.");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                window.location.reload(navigate("/"));
            }, 2000);
    };

    const handleConfirmationNo = () => {
        toggleConfirmation();
    };

    return (
        <>
                <Container>
                <Row>
                    <Col lg={10} className="mx-auto text-center">
                        <div className="change__password-form">
                            <div className="login__form">
                                <h2>Chỉnh sửa thông tin cá nhân</h2>
                                {showMessage && (
                                    <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
                                        {message}
                                    </div>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            placeholder="Họ và tên"
                                            required
                                            id="fullName"
                                            value={credentials.fullName}
                                            onChange={handleChange}
                                            readOnly={isUserDataFilled}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type="email"
                                            placeholder={credentials.email || "Email"}
                                            required
                                            id="email"
                                            // value={credentials.email}
                                            // onChange={handleChange}
                                            readOnly={!isUserDataFilled}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type="tel"
                                            placeholder="Số điện thoại"
                                            required
                                            id="phone"
                                            value={credentials.phone}
                                            onChange={handleChange}
                                            readOnly={isUserDataFilled}
                                        />
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth__btn" type="submit">
                                        Lưu thông tin
                                    </Button>
                                    <p><Link to='/home'>Hủy</Link></p>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={showConfirmation} toggle={toggleConfirmation}>
                <ModalHeader toggle={toggleConfirmation}>Xác nhận</ModalHeader>
                <ModalBody>
                    Hiện không có thông tin nào thay đổi, quý khách có đồng ý vẫn lưu thông tin này không?
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" onClick={handleConfirmationYes}>
                            Có
                        </Button>{' '}
                    <Button color="secondary" onClick={handleConfirmationNo}>
                        Không
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default EditProfile;
