import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Booking from "../components/Booking/Booking";
import { BASE_URL } from "../utils/config";
import useAxios from "./../hooks/useAxios";
import { BASE_IMAGE_URL } from "../utils/config";

import "../styles/book-tour.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faListCheck, faMoneyBill, faPhone } from "@fortawesome/free-solid-svg-icons";

const BookTour = () => {
  const currentPath = window.location.pathname;

  const paths = currentPath.split("/");
  const _id = paths[paths.length - 1];

  const { data: tour } = useAxios(`${BASE_URL}/tour/${_id}`, true);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const limitLength = (text, limit) => {
    if (text && text.length > limit) {
      return `${text.substring(0, limit)}...`;
    }
    return text;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const { imagePath, departureDate, price, address } = tour || {};

  // console.log("Tour details:", tour);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="7">
              <Booking />
            </Col>
            <Col lg="4">
              <div className="tour__information">
                <h3><FontAwesomeIcon icon={faListCheck} className="icon-list-check" /> Tóm tắt thông tin</h3>
                <hr />
                <div className="tour__info-content">
                  <div className="tour__info-tourName">
                    <span>{limitLength(tour?.tourName, 35)}</span>
                  </div>
                  <div className="tour__info-img">
                    {imagePath && (
                      <img src={`${BASE_IMAGE_URL}/${imagePath}`} alt={tour?.tourName} />
                    )}
                  </div>
                  <div className="tour__info-tourdetail">
                    <div className="tour__info-departureDate">
                      <span>Ngày dự kiến khởi hành: {limitLength(departureDate, 15)}</span>
                    </div>
                    <div className="tour__info-price">
                      <span>Giá vé: {VND.format(price)}</span>
                    </div>
                    <div className="tour__info-address">
                      <span>Địa điểm: {address}</span>
                    </div>
                  </div>

                  <div className="tour__info-item">
                    <span className="icon-item"><FontAwesomeIcon icon={faCalendar} color="#33afaf" />Có hiệu lực vào ngày {limitLength(departureDate, 10)} </span>
                  </div>
                  <div className="tour__info-item">
                    <span className="icon-item"><FontAwesomeIcon icon={faPhone} color="#33afaf" />Không cần đặt chỗ trước</span>
                  </div>
                  <div className="tour__info-item">
                    <span className="icon-item"><FontAwesomeIcon icon={faMoneyBill} color="#33afaf" />Không hoàn tiền</span>
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

export default BookTour;
