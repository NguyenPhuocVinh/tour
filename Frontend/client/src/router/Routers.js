import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import About from './../pages/About';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import PaymentPage from "../pages/PaymentPage";
import PurchaseList from "../pages/PurchaseList";  
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ChangePassword from "../pages/ChangePassword";
import BookTour from "../pages/BookTour";
import EditProfile from "../pages/EditProfile";
import SearchPage from "../pages/SearchPage";
import ThankYouBooking from "../pages/ThankYouBooking";

const Routers = () => {
    return (    
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/tour/:_id' element={<TourDetails />} />
            <Route path='/payment/:id' element={<PaymentPage />} />
            <Route path='/purchase-list' element={<PurchaseList />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/booking/:id' element={<BookTour />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/search-page' element={<SearchPage />} />
            <Route path='/thank-you' element={<ThankYouBooking/>} />        


        </Routes>
    );
};

export default Routers;
