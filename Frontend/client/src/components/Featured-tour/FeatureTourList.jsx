import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import TourCard from "../../shared/TourCard";
import useAxios from "./../../hooks/useAxios";
import { BASE_URL } from "./../../utils/config";

import "./feature-tour-list.css";

import { Link } from "react-router-dom";

const FeatureTourList = () => {
  const [randomTours, setRandomTours] = useState([]);

  const { data: allTours } = useAxios(`${BASE_URL}/tour/featured`);

  useEffect(() => {
    if (allTours && allTours.length > 0) {
      const randomIndices = getRandomIndices(allTours.length, 4);
      const selectedTours = randomIndices.map(index => allTours[index]);
      setRandomTours(selectedTours);
    }
  }, [allTours]);

  const getRandomIndices = (max, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const scollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="tour__featured mb-5">
            <h2 className="feature__tour-title">Không thể không đến</h2>
            <h4 className="feature__tour-subtitle">
              Đi cùng người thân vừa vui vừa thích
            </h4>
          </Col>
          <Col md="12" className="mb-4">
            <Row>
              {randomTours.map((tour) => (
                <Col lg="3" md="6" sm="6" className="tour-card__left mb-3" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="text-center">
            <Link to="/tours" className="view-all-link" onClick={scollToTop}>
              Xem tất cả <i className="ri-arrow-right-line"></i>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeatureTourList;
