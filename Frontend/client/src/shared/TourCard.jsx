import React from "react";
import { Card, CardBody } from "reactstrap";

import "./tour-card.css";
import { BASE_IMAGE_URL } from "../utils/config";

const TourCard = ({ tour }) => {
  const { _id, imagePath, tourName, price, address } = tour;

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  const pageTourDetail = () => {
    window.location.href = `/tour/${_id}`;
  };

  const VND = new Intl.NumberFormat('vi-VN', {  
    style: 'currency',
    currency: 'VND',
  });

  // console.log('Việt Nam đồng: ' + VND.format(price));

  return (
    <div className="tour__card" onClick={pageTourDetail} >
        <Card>
          <div className="tour__img">
              <img src={`${BASE_IMAGE_URL}/${imagePath}`} alt="tour-img" />
          </div>
          <CardBody>
            <div className="card__top d-flex align-items-centers justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1 ">
                <i className="ri-map-pin-line"></i>{" "}
                {truncateString(address, 15)}
              </span>
            </div>

            <h5 className="tour__title" onClick={pageTourDetail}>
                {truncateString(tourName, 25)}
            </h5>
            <div className="card__bottom d-flex align-items-center justify-content-between">
              <h5>
                <p>{VND.format(price)}</p>
              </h5>
            </div>
          </CardBody>
        </Card>
    </div>
  );
};

export default TourCard;
