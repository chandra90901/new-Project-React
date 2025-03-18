import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const Pages = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-pages">
                📄 Pages
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleNavigation('/pages/category')}>
                    📚 Category
                </Dropdown.Item>

                <Dropdown.Item onClick={() => alert('🍎 Welcome to Fruits!')}>
                    🍎 Fruits
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item onClick={() => alert('✨ Something else here!')}>
                    ✨ Something Else
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Pages;
