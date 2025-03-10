import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import Category form './Category'

import { useNavigate } from 'react-router-dom';
const Pages = () => {
    const navigate = useNavigate();

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                pages
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/pages/Category')}>Category</Dropdown.Item>
                <Dropdown.Item onClick={() => alert('hi welcome')}>
                    Fruits
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert('Something else here')}>
                    Something else here
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Pages;