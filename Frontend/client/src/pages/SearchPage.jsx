import React, { useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import Search from "../components/Search/Search";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import TourCard from "../shared/TourCard";
import '../styles/search-page.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import SearchImg from '../assets/images/searchfaile.png';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword') || '';

    useEffect(() => {
        if (keyword) {
            fetchSearchResults(keyword);
        }
    }, [keyword]);

    const fetchSearchResults = async (searchTerm) => {
        try {
            const response = await axios.get(`${BASE_URL}/tour/search?keyword=${searchTerm}`);
            setSearchResults(response.data.tours);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <>
            <section className="header-search"  >
                <Container>
                    <Row className="header-search__row">
                        <Col md="3">
                            <Breadcrumb style={{ marginTop: "13px", textAlign: "center" }}>
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/tours" }}>Khám phá Tour</Breadcrumb.Item>
                                <Breadcrumb.Item active>Kết quả Tìm kiếm</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col md="2">
                            <div className="search-key" style={{ marginTop: "13px", textAlign: "center" }}>
                                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-color" /> Tìm kiếm: <strong>{keyword}</strong></p>
                            </div>
                        </Col>
                        <Col md="7" className="search-bar">
                            <Search />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="footer-search">
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="result-search">
                                <h6>Hiển thị hoạt động với "{keyword}"...</h6>
                                <Row>
                                    {searchResults.length > 0 ? (
                                        searchResults.map((tour) => (
                                            <Col className="mb-4" key={tour._id} xs={12} sm={6} md={4} lg={3}>
                                                <TourCard tour={tour} />
                                            </Col>
                                        ))
                                    ) : (
                                        <div className="search__page-item text-center">
                                            <img src={SearchImg} alt="" />
                                            <h6>Ôi, chúng tôi không tìm thấy kết quả.</h6>
                                        </div>
                                    )}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SearchPage;
