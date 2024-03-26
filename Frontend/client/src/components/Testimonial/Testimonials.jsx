import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/lai.png";
import ava02 from "../../assets/images/luong.jpg";
import ava03 from "../../assets/images/dat.jpg";
import ava04 from "../../assets/images/vinh.png";
import ava05 from "../../assets/images/trinh.png";
import './testimonials.css';


const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slideToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slideToScroll: 1,
            },
        },

    ]

}

const Testimonials = () => {
    return <Slider {...settings}>
        <div className="testimonial py-4 px-3">
            <p>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing
        explicabo provident hic distinctio molestias voluptate
        placeat suscipit earum debitis recusandae voluptate il
        corrupti aliquid doloribus delectus? */}
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className='custom-size rounded-2' alt="" />
                <div>
                    <h6 className="mb-1 mt-3">Hồ Thị Thanh Lai</h6>
                    <p>Product Owner</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing
        explicabo provident hic distinctio molestias voluptate
        placeat suscipit earum debitis recusandae voluptate il
        corrupti aliquid doloribus delectus? */}
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className='custom-size rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Nguyễn Văn Lượng</h6>
                    <p>Project Manager</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing
        explicabo provident hic distinctio molestias voluptate
        placeat suscipit earum debitis recusandae voluptate il
        corrupti aliquid doloribus delectus? */}
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} className='custom-size rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Nguyễn Tiến Đạt</h6>
                    <p>Developer</p>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing
        explicabo provident hic distinctio molestias voluptate
        placeat suscipit earum debitis recusandae voluptate il
        corrupti aliquid doloribus delectus? */}
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava04} className='custom-size rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Nguyễn Phước Vĩnh </h6>
                    <p>Developer</p>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing
        explicabo provident hic distinctio molestias voluptate
        placeat suscipit earum debitis recusandae voluptate il
        corrupti aliquid doloribus delectus? */}
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava05} className='custom-size rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Lê Nguyễn Đình Trình</h6>
                    <p>Developer</p>
                </div>
            </div>
        </div>
    </Slider>
};

export default Testimonials;
