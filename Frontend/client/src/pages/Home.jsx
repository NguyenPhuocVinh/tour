import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/home.css";

import Newsletter from "../shared/Newsletter";
import FeatureTourList from "../components/Featured-tour/FeatureTourList";
import SearchBar from "../shared/SearchBar";
import TourCardmg1 from '../assets/images/advertisement3.jpeg';
import TourCardmg2 from '../assets/images/advertisement2.jpg';
import TourCardmg3 from '../assets/images/advertisement4.jpg';
import ImageDetail from '../assets/images/reponse.png';
import ImageDetail2 from '../assets/images/option.png';
import ImageDetail3 from '../assets/images/payment.png';
// import CategoryTour from "../components/Category-tour/CategoriesTour";

const Home = () => {

  return (
    <>
      <SearchBar />
      <Container>
        <Row>
          <Col lg="6">
            <img src={TourCardmg1} alt="TourCardmg1" className="tourCardImg" />
          </Col>
          <Col lg="6">
            <img src={TourCardmg2} alt="TourCardmg1" className="tourCardImg" />
          </Col>
          <Col lg="12">
            <img src={TourCardmg3} alt="TourCardmg2" className="tourCardImg2" />
          </Col>
        </Row>
        <Row>
          <FeatureTourList />
          {/* <CategoryTour /> */}
        </Row>
        <Row>
          <h2 className="home__tour-title">Lý do nên đặt tour với TourViet?</h2>
          <Col lg="4">
            <div className="home__detail home__detail--icon">
              <img src={ImageDetail} alt="" />
              <h3>Đáp ứng mọi nhu cầu của bạn</h3>
              <h6>Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch  của chúng tôi.</h6>
            </div>
          </Col>
          <Col md="4">
            <div className="home__detail home__detail--icon">
              <img src={ImageDetail2} alt="" />
              <h3>Tùy chọn đặt chỗ linh hoạt</h3>
              <h6>Kế hoạch thay đổi bất ngờ? Đừng lo! Đổi lịch hoặc Hoàn tiền dễ dàng.</h6>
            </div>
          </Col>
          <Col md="4">
            <div className="home__detail home__detail--right">
              <img src={ImageDetail3} alt="" />
              <h3>Thanh toán an toàn và thuận tiện</h3>
              <h6>Tận hưởng nhiều cách thanh toán an toàn, bằng loại tiền thuận tiện nhất cho bạn.</h6>
            </div>
          </Col>
        </Row>
        <br />
      </Container>
      <Container>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </>
  );
};

export default Home;
