import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import logo from '../../assets/images/TOURVIET2.png';
import { AuthContext } from '../../context/AuthContext';
import './header.css';

const nav__link = [
    {
        path: '/home',
        display: 'Trang chủ'
    },
    {
        path: '/about',
        display: 'Giới thiệu'
    },
    {
        path: '/tours',
        display: 'Tours'
    },
    {
        path: '/contact',
        display: 'Liên hệ'
    }
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    // const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
        window.location.reload();
        // navigate("/home");
    }

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (headerRef.current) {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    headerRef.current.classList.add('sticky__header');
                } else {
                    headerRef.current.classList.remove('sticky__header')
                }
            }
        })
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    const confirmLogout = () => {
        logout();
        toggleConfirmation();
    };

    useEffect(() => {
        if (user && user.fullName) {
            setFullName(user.fullName);
        }
    }, [user]);

    useEffect(() => {
        stickyHeaderFunc();
        return () => window.removeEventListener('scroll', stickyHeaderFunc);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && user && !user.fullName) {
            axios.get(`${BASE_URL}/user/login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                const { fullName } = response.data.user;
                setFullName(fullName);
                dispatch({ type: "SET_FULL_NAME", payload: fullName });
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [user, dispatch]);

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper d-flex align-items-center justify-content-between">
                        <Link to={`/home`} className="logo" onClick={scrollToTop}>
                            <img src={logo} alt="" />
                        </Link>

                        <div className="navigation" ref={menuRef}>
                            <ul className="menu d-flex align-items-center gap-5">
                                {nav__link.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path} onClick={scrollToTop} className={navClass => navClass.isActive ? 'active__link' : ""}>
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nav__right">
                            {user ? (
                                <div className="nav__btn d-flex align-items-center">
                                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className={dropdownOpen ? 'active' : 'inactive'}>
                                        <DropdownToggle className="btn d-flex btn-dark" caret  >
                                            <i className="ri-user-3-fill"></i><span className="fullName-login">{fullName}</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem className="d-flex align-items-center" onClick={scrollToTop}>
                                                <i className="ri-user-settings-line"></i><Link to="/edit-profile">Chỉnh sửa hồ sơ</Link>
                                            </DropdownItem>
                                            <DropdownItem className="d-flex align-items-center" onClick={scrollToTop}>
                                                <i className="ri-exchange-line"></i><Link to={`/change-password`}>Đổi mật khẩu</Link>
                                            </DropdownItem>
                                            <DropdownItem className="d-flex align-items-center" onClick={scrollToTop}>
                                                <i className="ri-list-view"></i><Link to="/purchase-list">Danh sách giao dịch</Link>
                                            </DropdownItem>
                                            <DropdownItem className="d-flex align-items-center" divider />
                                            <DropdownItem className="d-flex align-items-center" onClick={toggleConfirmation}>
                                                <i className="ri-logout-circle-r-line"></i>Đăng Xuất
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            ) : (
                                <div className="nav__btn d-flex align-items-center gap-4">
                                    <Button className="login" onClick={scrollToTop}>
                                        <i className="ri-user-fill"></i>
                                        <Link to="/login">Đăng Nhập</Link>
                                    </Button>
                                    <Button className="register" onClick={scrollToTop}>
                                        <Link to="/register">Đăng Ký</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Row>
            </Container>

            <Modal isOpen={showConfirmation} toggle={toggleConfirmation}>
                <ModalHeader toggle={toggleConfirmation}>Xác nhận Đăng Xuất</ModalHeader>
                <ModalBody>
                    Ôi không! Bạn có chắc chắn muốn đăng xuất?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={confirmLogout}>
                        Có
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleConfirmation}>
                        Không
                    </Button>
                </ModalFooter>
            </Modal>
        </header>
    );
};

export default Header;
