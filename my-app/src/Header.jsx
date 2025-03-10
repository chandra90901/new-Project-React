import React from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    return (
        <header>
            <NavBar />
        </header>
    );
};

export default Header;