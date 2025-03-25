import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const MenuToggle = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const email = localStorage.getItem("email");

    useEffect(() => {
        // Check if user is logged in
        const storedEmail = localStorage.getItem("Email");
        const storedPassword = localStorage.getItem("Password");
        setIsLoggedIn(!!(storedEmail && storedPassword));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("Email");
        localStorage.removeItem("Password");
        setIsLoggedIn(false);
        navigate("/Accounts/login");
    };

    return (

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaUserCircle style={{ marginRight: '8px' }} />
                {email ? email : "Guest"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {isLoggedIn ? (
                    <Dropdown.Item onClick={() => navigate('/Accounts/login')}>
                        <FaSignInAlt style={{ marginRight: '8px' }} /> Login
                    </Dropdown.Item>
                ) : (
                    <Dropdown.Item onClick={handleLogout}>
                        <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MenuToggle;
