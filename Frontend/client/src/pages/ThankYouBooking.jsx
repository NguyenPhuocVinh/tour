import React, { useEffect, useState } from "react";
import WelcomeImg2 from '../assets/images/welcome.png';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../utils/config";

const ThankYouBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); 

    useEffect(() => {
        const thankyou = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/pay/vnpay_return${location.search}`);
                const data = res.data;
                console.log(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        thankyou();
    }, [location.search]);

    useEffect(() => {
        const timer =
            countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        if (countdown === 0) {
            navigate('/');
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <>
            <div className="success-form">
                <img src={WelcomeImg2} alt="" />
                <h2>Chúc mừng bạn đã đặt tour thành công</h2>
                <h6>Nếu có gì thắc mắc hãy liên hệ với chúng tôi để có giải đáp sớm nhất.</h6>
                <h6>Đang chuyển hướng về trang chủ trong {countdown} giây...</h6>
            </div>
        </>
    );
};

export default ThankYouBooking;
