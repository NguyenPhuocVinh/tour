import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios"; // Import axios

import Payment from "../components/Payment/Payment";

import "../styles/payment-page.css";

const PaymentPage = () => {
  const [bookingInfo, setBookingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const currentPath = window.location.pathname;
        const paths = currentPath.split("/");
        const bookingId = paths[paths.length - 1];

        const response = await axios.get(
          `http://localhost:4000/api/v1/booking/${bookingId}`
        );
        const fetchedBookingInfo = response.data.booking;
        setBookingInfo(fetchedBookingInfo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking info:", error);
        setLoading(false);
      }
    };

    fetchBookingInfo();
  }, []);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="7">
              <Payment />
            </Col>
            <Col lg="4">
              <div className="payment__information">
                <div className="booking__code">
                  <h3>MÃ ĐẶT CHỖ</h3>
                  <p>{bookingInfo ? bookingInfo._id : "Loading..."}</p>
                  <br />
                </div>
                <div>
                  <h3>CHI TIẾT ĐẶT CHỖ</h3>
                  <hr />
                  <div className="payment__info-content">
                    {!loading && bookingInfo && (
                      <>
                        <div className="payment__info-tourName">
                          <div className="payment__info-tourdetail">
                            <div className="payment__info-departureDate">
                              <span>
                                Ngày tham gia đã {bookingInfo.departureDate} chọn.
                              </span>
                            </div>
                            <div className="payment__info-quantity">
                              <span>Áp dụng cho khách: {bookingInfo.quantity}</span>
                            </div>
                          </div>
                        </div>
                        <br />
                        <h3>KHÁCH</h3>
                        <div className="payment__info-item">
                          <div className="payment__info-item">
                            <span className="icon-item">{bookingInfo.fullName}</span>
                          </div>
                          <div className="payment__info-item">
                            <span className="icon-item">{bookingInfo.email}</span>
                          </div>
                          <div className="payment__info-item">
                            <span className="icon-item">{bookingInfo.phone}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PaymentPage;
