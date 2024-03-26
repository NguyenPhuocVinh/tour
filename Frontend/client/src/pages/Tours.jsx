import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import Newsletter from "./../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Tours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(8);
    const [currentKeyword, setCurrentKeyword] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState("all");

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/tour`);
                setTours(response.data.tours);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleKeywordClick = (keyword) => { 
        if (keyword === "all") {
            setCurrentKeyword("");
        } else {
            setCurrentKeyword(keyword); 
        }
        setSelectedCharacter(keyword);
    };
    

    const filteredTours = tours.filter((tour) => {
        if (!currentKeyword) {
            return true;
        }
        return tour.address.toLowerCase().includes(currentKeyword.toLowerCase());
    });

    const indexOfLastTour = currentPage * pageSize;
    const indexOfFirstTour = indexOfLastTour - pageSize;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

    const scollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <CommonSection />
            <section className="tour__card">
                <Container>
                    {loading && (
                        <div className="text-center pt-5">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {error && <h4 className="text-center pt-5">{error}</h4>}

                    {!loading && !error && (
                        <Row>
                            <Col>
                                <div className="section__title">
                                    <h2>Khám phá các tour du lịch</h2>
                                    <p>Khám phá các tour du lịch tuyệt vời từ các đối tác của chúng tôi</p>
                                </div>
                                <div className="section__title-character">
                                    <span
                                        className={selectedCharacter === "all" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("all")}
                                    >
                                        Tất cả
                                    </span>
                                    <span
                                        className={selectedCharacter === "Đà Lạt" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("Đà Lạt")}
                                    >
                                        Đà Lạt
                                    </span>
                                    <span
                                        className={selectedCharacter === "Nha Trang" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("Nha Trang")}
                                    >
                                        Nha Trang
                                    </span>
                                    <span
                                        className={selectedCharacter === "Phú Quốc" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("Phú Quốc")}
                                    >
                                        Phú Quốc
                                    </span>
                                    <span
                                        className={selectedCharacter === "Phan Thiết" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("Phan Thiết")}
                                    >
                                        Phan Thiết
                                    </span>
                                    <span
                                        className={selectedCharacter === "Đà Nẵng" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("Đà Nẵng")}
                                    >
                                        Đà Nẵng
                                    </span>
                                    <span
                                        className={selectedCharacter === "Phú Yên" ? "character active" : "character"}
                                        onClick={() => handleKeywordClick("Phú Yên")}
                                    >
                                        Phú Yên
                                    </span>
                                </div>

                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <section className="pt-0">
                <Container>
                    <Row>
                        {currentTours.length > 0 ? (
                            currentTours.map((tour) => (
                                <Col lg="3" className="mb-4" key={tour._id}>
                                    <TourCard tour={tour} />
                                </Col>
                            ))
                        ) : (
                            <Col lg="12" className="text-center mt-5">
                                <h4>No tours available</h4>
                            </Col>
                        )}
                    </Row>
                    {filteredTours.length > pageSize && (
                        <Row>
                            <Col lg="12">
                                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3" onClick={scollToTop}>
                                    {Array.from({ length: Math.ceil(filteredTours.length / pageSize) }, (_, index) => (
                                        <span
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={currentPage === index + 1 ? "active__page" : ""}
                                        >
                                            {index + 1}
                                        </span>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default Tours;
