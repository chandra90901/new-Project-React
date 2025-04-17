import React from 'react';
import NavBar from './NavBar';

const Header = () => {
    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                backgroundColor: 'black',
            }}
        >
            <NavBar />
        </header>
    );
};

export default Header;
