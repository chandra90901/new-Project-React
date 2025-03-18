import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBox, FaGift, FaShoppingCart } from 'react-icons/fa';

const Shop = () => {
    const navigate = useNavigate();

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaShoppingCart style={{ marginRight: '8px' }} /> Shop
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/Shop/items')}>
                    <FaBox style={{ marginRight: '8px' }} /> Items
                </Dropdown.Item>

                <Dropdown.Item onClick={() => alert('Something else here')}>
                    <FaGift style={{ marginRight: '8px' }} /> Something else here
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Shop;
