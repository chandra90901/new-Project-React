import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Signup from './signup';
import Login from './login';

const MenuToggle = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaUserCircle style={{ marginRight: '8px' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleNavigation('/Accounts/login')}>
                    <FaSignInAlt style={{ marginRight: '8px' }} /> Login
                </Dropdown.Item>

                <Dropdown.Item onClick={() => handleNavigation('/Accounts/signup')}>
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MenuToggle;
