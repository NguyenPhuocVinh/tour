

import React from "react";
import './common-section.css';

import { Container, Row, Col } from 'reactstrap';
import Search from "../components/Search/Search";

const CommonSection = ({ title }) => {

  return (
    <>
      <section className="common__section">
        <Container>
          <Row>
            <Col lg='12'>
              <div className="search__bar">
                <Search />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
};

export default CommonSection;
