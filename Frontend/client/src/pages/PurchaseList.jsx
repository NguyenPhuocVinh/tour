import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TransactionImg from '../assets/images/transaction.png';
import '../styles/purchase-list.css';

const PurchaseList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/v1/user/history_booking', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransactions(response.data.historyBookings);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Container>
            <Row>
                <Col md="8" className="purchase-list__item mx-auto">
                    <h2 className="purchase-list__title">Đang giao dịch ({transactions.length})</h2>
                    {transactions.length === 0 ? (
                        <div className="booking__login-url">
                            <Row>
                                <Col md="4">
                                    <div className="login__img">
                                        <img src={TransactionImg} alt="" />
                                    </div>
                                </Col>
                                <Col md="7">
                                    <div className="booking__login-info">
                                        <p>Không tìm thấy giao dịch</p>
                                        <p>Bạn có thể xem thông tin giao dịch mới tại đây. Các giao dịch cũ sẽ được hiển thị bằng cách bạn tạo giao dịch mới.</p>
                                        <Link to={`/tours`}>
                                            <Button className="login-button">Tạo giao dịch mới</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <>
                            {transactions.map(transaction => (
                                <Row key={transaction._id} className="mb-4 purchase-list-card">
                                    <Col md="12">
                                        <div className="purchase__list-name">
                                            <div className="purchase__booking-id">Mã đặt chỗ TourViet <span>{transaction._id}</span></div>
                                            <div className="purchase__tourName"><i class="ri-price-tag-3-line"></i>{transaction.tourName}</div>
                                            <div className="purchase__payment-status" >
                                                <p style={{ backgroundColor: transaction.paymentStatus === 'Chưa thanh toán' ? 'red' : 'blue' }}>Trạng thái thanh toán: {transaction.paymentStatus}</p>
                                            </div>
                                            <div className="purchase-right-content">
                                                <div className="purchase__totalAmount">{transaction.totalAmount.toLocaleString()} VND</div>
                                                {transaction.paymentStatus === 'Chưa thanh toán' ? (
                                                    <Link to={`/payment/${transaction._id}`}>
                                                        <p className="purchase-details">Xem chi tiết</p>
                                                    </Link>
                                                ) : null}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PurchaseList;
