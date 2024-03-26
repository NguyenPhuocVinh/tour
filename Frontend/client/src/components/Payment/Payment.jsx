import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ListGroup, ListGroupItem, Button, Col, Row } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import VNPAYImg from '../../assets/images/vnpay.jpg';
import './payment.css';

const Payment = () => {
    const [bookingInfo, setBookingInfo] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const currentPath = window.location.pathname;
    const paths = currentPath.split("/");
    const bookingId = paths[paths.length - 1];

    useEffect(() => {
        const fetchBookingInfo = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/booking/${bookingId}`);
                const fetchedBookingInfo = res.data.booking;
                setBookingInfo(fetchedBookingInfo);
                setTotalAmount(fetchedBookingInfo.totalAmount);
            } catch (error) {
                console.error("Error fetching booking info:", error);
            }
        };

        fetchBookingInfo();
    }, [bookingId]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/pay/create_payment_url/${bookingId}`);
            const result = res.data.vnpUrl;
            if (res.status === 200) {
                window.open(result, '_self');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="payment">
            <div className="payment__check-login">
                <h3>Thanh toán</h3>
            </div>
            <div className="payment__form">
                <h5>Phương thức thanh toán</h5>
                <div className="payment__form-img">
                    <Row>
                        <Col md="4">
                            <img src={VNPAYImg} alt="VNPAY" />
                        </Col>
                        <Col md="7">
                            <div className="payment__info">
                                <p>Thực hiện thanh toán với cổng thanh toán VNPAY và Mở ví thành viên cho người thân, đặt hạn mức và theo dõi chi tiêu dễ dàng.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="payment__bottom">
                <h5>Chi tiết giá</h5>
                {bookingInfo && (
                    <ListGroup className="payment__bottom-total">
                        <ListGroupItem className="total__payment border-0 px-1 total">
                            <Row>
                                <Col md="6">Tổng giá tiền</Col>
                                <Col md="6" className="price__payment">
                                    <p>{totalAmount ? VND.format(totalAmount) : 'Loading...'}</p>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                )}
            </div>
            <br />
            <p className="payment-rules">Bằng việc nhấn Thanh toán, bạn đồng ý Điều khoản & Điều kiện và chính sách quyền riêng tư.</p>
            <br />
            <Button className="button__payment-method" onClick={handleClick}>Thanh Toán</Button>
        </div>
    );
};

export default Payment;
