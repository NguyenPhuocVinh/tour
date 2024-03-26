import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import CardCategoriesImg from "../../assets/images/VietNam15.jpg";
import "./categories-tour.css";

const CategoriesTour = () => {
    return (
        <div className="categories__container">
            <div className="tour__card">
                <Card>
                    <div className="tour__img">
                        <Link to={`/home`}>
                            <img src={CardCategoriesImg} alt="tour-img" />
                        </Link>
                    </div>
                </Card>
            </div>
            <div className="tour__card">
                <Card>
                    <div className="tour__img">
                        <Link to={`/home`}>
                            <img src={CardCategoriesImg} alt="tour-img" />
                        </Link>
                    </div>
                </Card>
            </div>
            <div className="tour__card">
                <Card>
                    <div className="tour__img">
                        <Link to={`/home`}>
                            <img src={CardCategoriesImg} alt="tour-img" />
                        </Link>
                    </div>
                </Card>
            </div>
            <div className="tour__card">
                <Card>
                    <div className="tour__img">
                        <Link to={`/home`}>
                            <img src={CardCategoriesImg} alt="tour-img" />
                        </Link>
                    </div>
                </Card>
            </div>
            <div className="tour__card">
                <Card>
                    <div className="tour__img">
                        <Link to={`/home`}>
                            <img src={CardCategoriesImg} alt="tour-img" />
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default CategoriesTour;
