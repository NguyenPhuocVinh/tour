import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import "./search.css";
import SearchImg from '../../assets/images/searchfaile.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { BASE_IMAGE_URL } from "../../utils/config";

const Search = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allTours, setAllTours] = useState([]);
    const navigate = useNavigate();
    const [dropdownActive, setDropdownActive] = useState(false);

    useEffect(() => {
        fetchAllTours();
    }, []);

    const fetchAllTours = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tour`);
            setAllTours(response.data.tours);
        } catch (error) {
            console.error("Error fetching all tours:", error);
        }
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim().length < 1) {
            setShowDropdown(false);
            return;
        }
        filterSearchResults(value);
        setShowDropdown(true);
    };

    const filterSearchResults = (keyword) => {
        const filteredResults = allTours.filter(tour =>
            keyword.split(" ").every(word =>
                tour.address && tour.tourName.toLowerCase().includes(word.toLowerCase())
            )
        );
        setSearchResults(filteredResults);
    };

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (searchTerm.trim().length >= 2) {
            filterSearchResults(searchTerm.trim());
            setDropdownActive(true);
            window.location.href =`/search-page?keyword=${encodeURIComponent(searchTerm.trim())}`;
        } else {
            setDropdownActive(false);
            setSearchResults([]);
        }
    };

    const handleSearchClick = () => {
        handleSubmit();
    };

    const handleSearchBlur = () => {
        if (!dropdownActive) {
            setShowDropdown(false);
        }
    };

    const handleDropdownItemClick = (result) => {
        console.log("Selected:", result);
        navigate(`/tour/${result._id}`);
    };

    const handleDropdownMouseEnter = () => {
        setDropdownActive(true);
    };

    const handleDropdownMouseLeave = () => {
        setDropdownActive(false);
    };

    const handleDropdownFocus = () => {
        if (searchResults.length > 0) {
            setDropdownActive(true);
        }
    };

    return (
        <>
            <div className="search__input">
                <i className="ri-search-line"></i>
                <input
                    type="text"
                    placeholder="Tìm địa điểm mới cho chuyến đi tiếp theo của bạn ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onClick={handleSearchClick}
                    onBlur={handleSearchBlur}
                    onFocus={handleDropdownFocus}
                />
                <button className="btn search__btn" onClick={handleSearchClick}>
                    Tìm kiếm
                </button>
                {showDropdown && (
                    <>
                        <div className="search__overlay" onClick={handleSearchBlur}></div>

                        <div
                            className="search__dropdown"
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                        >
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="search__dropdown-item"
                                        onClick={() => handleDropdownItemClick(result)}
                                    >
                                        <div className="search__item">
                                            {result.imagePath && (
                                                <img
                                                    className="search__item-image"
                                                    src={`${BASE_IMAGE_URL}/${result.imagePath}`}
                                                    alt={result.tourName}
                                                />
                                            )}
                                            <div className="search__item-details">
                                                <p className="search__item-name">{result.tourName}</p>
                                                <p className="search__item-address">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-address" /> {result.address}
                                                </p>
                                                <span className="search__item-price d-flex"><h6>{VND.format(result.price)}</h6></span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="search__dropdown-item text-center">
                                    <img src={SearchImg} alt="" />
                                    <h6>Ôi, chúng tôi không tìm thấy kết quả.</h6>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Search;
