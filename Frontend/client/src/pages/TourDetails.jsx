import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Newsletter from "./../shared/Newsletter";
import useAxios from "./../hooks/useAxios";
import { BASE_URL } from "../utils/config";
import TourCard from "../shared/TourCard";
import '../styles/tour-details.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faCircleInfo, faMessage, faUser, faQuestion } from "@fortawesome/free-solid-svg-icons";
// import CurrencyFormat from "react-currency-format";
import Search from "../components/Search/Search";
import { BASE_IMAGE_URL } from "../utils/config";


const TourDetails = () => {
    const { _id } = useParams();
    const [showAllDescription, setShowAllDescription] = useState(false);

    const { data: tour, error: tourError, loading: tourLoading } = useAxios(`${BASE_URL}/tour/${_id}`, true);
    const { data: allTours, error: allToursError, loading: allToursLoading } = useAxios(`${BASE_URL}/tour/featured`);

    const getRandomTours = (allTours) => {
        if (!allTours || allTours.length === 0) {
            return [];
        }

        const getRandomIndex = () => Math.floor(Math.random() * allTours.length);

        const selectedTours = [];
        const selectedIndexes = new Set();

        while (selectedTours.length < 4) {
            const randomIndex = getRandomIndex();
            if (!selectedIndexes.has(randomIndex)) {
                selectedTours.push(allTours[randomIndex]);
                selectedIndexes.add(randomIndex);
            }
        }

        return selectedTours;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const handleClickButton = () => {
        window.location.href = `/booking/${_id}`;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tour]);

    if (tourLoading || allToursLoading) return <p>Loading...</p>;

    if (tourError || !tour || allToursError || !allTours) {
        console.error("Error loading tour details:", tourError || allToursError);
        return <p>Error loading tour details!</p>;
    }

    const { imagePath, tourName, departureDate, description, price, address, size } = tour;

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    // console.log('Việt Nam đồng: ' + VND.format(price));

    const toggleShowDescription = () => {
        setShowAllDescription(!showAllDescription);
    };

    let limitedDescription = "";
    if (description) {
        limitedDescription = showAllDescription ? description : description.slice(0, 290);
    }

    const randomTours = getRandomTours(allTours);

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <Search />
                            <br />
                            <div className="tour__content">
                                <div className="tour__name">
                                    <h2>{tourName}</h2>
                                    <div className="icon-text">
                                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-color" /> {address}</p>
                                    </div>
                                    <div className="icon-text">
                                        <p><FontAwesomeIcon icon={faUser} className="icon-color" /> Số lượng khách tham gia tối đa: {size}</p>
                                    </div>
                                </div>
                                <div className="tour__image d-flex align-items-center ">
                                    {imagePath && (
                                        <img src={`${BASE_IMAGE_URL}/${imagePath}`} alt={tourName} />
                                    )}
                                </div>
                                <div className="tour__info">
                                    <Row>
                                        <Col md="4">
                                            <div className="tour__detail tour__detail--icon">
                                                <p><FontAwesomeIcon icon={faCalendarAlt} className="icon-detail" />Ngày dự kiến khởi hành</p>
                                                <h6>{formatDate(departureDate)}</h6>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="tour__detail tour__detail--icon">
                                                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-detail" /> Địa điểm</p>
                                                <h6>{address}</h6>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="tour__detail tour__detail--right">
                                                <h3>Bắt đầu từ:</h3>
                                                <div className="price-container">
                                                    {/* <CurrencyFormat
                                                        value={price}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={" VND"}
                                                        renderText={(value) => (
                                                            <p>{value}</p>
                                                        )}
                                                    /> */}
                                                    <p>{VND.format(price)}</p>
                                                    <div className="select-button">
                                                        <Button onClick={handleClickButton}>Đặt ngay</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="8">
                                            <div className="tour__description">
                                                <h5><FontAwesomeIcon icon={faQuestion} className="icon-description" /> Bạn sẽ trải nghiệm</h5>
                                                <div className="description-content">
                                                    <p>{limitedDescription}</p>
                                                    {description && description.length > 290 && (
                                                        <Button className="button__description" color="link" onClick={toggleShowDescription}>
                                                            {showAllDescription ? "Thu gọn" : "Đọc thêm"}
                                                        </Button>
                                                    )}
                                                </div>
                                                <hr />
                                                <div className="tour__contact">
                                                    <h5><FontAwesomeIcon icon={faCircleInfo} className="icon-contact" />Thông tin liên hệ, Tiện ích, Dịch vụ ngôn ngữ và nhiều thông tin khác</h5>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="tour__reviews">
                                                <h5><FontAwesomeIcon icon={faMessage} className="icon-reviews" />Mọi người nói gì</h5>
                                                <hr />
                                                <div className="review__item">
                                                    <div className="review__item--star">
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <br />
                            <div className="tour__tip-tip">
                                <h6>Bạn cũng có thể thích</h6>
                                <Row>
                                    {randomTours.map((tour) => (
                                        <Col key={tour._id} lg="3" md="6" className="mb-4">
                                            <TourCard tour={tour} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default TourDetails;
