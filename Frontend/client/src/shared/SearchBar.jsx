import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../shared/searchbar.css";
import Search from "../components/Search/Search";

const SearchBar = () => {
    const handleKeywordClick = (keyword) => {
        window.location.href = `/search-page?keyword=${keyword}`;
    };

    return (
        <>
            <section className="search__img">
                <Container>
                    <Row>
                        <Col>
                            <h2>Từ Bắc đến Nam, Trong Tầm Tay Bạn</h2>
                            <br /><br />
                            <i className="ri-arrow-down-line"></i>
                            <Search/>
                            <div className="search__characters">
                                <span>Hoặc chọn một số địa danh để bạn mở khóa trải nghiệm tiếp theo của bạn</span>
                            </div>
                            <div className="characters__suggest">
                                <span onClick={() => handleKeywordClick("Đà Lạt")}>Đà Lạt</span>
                                <span onClick={() => handleKeywordClick("Phú Quốc")}>Phú Quốc</span>
                                <span onClick={() => handleKeywordClick("Quy Nhơn")}>Quy Nhơn</span>
                                <span onClick={() => handleKeywordClick("Hội An")}>Hội An</span>
                                <span onClick={() => handleKeywordClick("Đà Nẵng")}>Đà Nẵng</span>
                                <span onClick={() => handleKeywordClick("Hải Phòng")}>Hải Phòng</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SearchBar;
