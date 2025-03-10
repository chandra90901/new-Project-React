import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';


const Shop = () => {
    const navigate = useNavigate();
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Shop
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/Shop/items')}>
                    Items
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert('Something else here')}>
                    Something else here
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Shop;
