import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Pages from './pages/Pages';
import Home from './Home';
import Shop from './Shop/shop';
import MenuToggle from './Accounts/MenuToggle';
import Signup from './Accounts/signup';
import Login from './Accounts/login';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { NavItem } from 'react-bootstrap';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <ul className="navbar navbar-expand-lg navbar-light bg-light  px-3 py-2" style={{ border: "2px solid green", justifyContent: "center" }}>
            <h1 className="me-4">Ram Super market</h1>
            < NavItem  className='mx-3'>
                <Pages />
            </ NavItem >
            < NavItem  className="mx-3">
                <Shop />
            </ NavItem >
            {/* < NavItem  className="mx-3" >
                <Pages />
            </ NavItem > */}
            < NavItem  className="mx-3">
                <MenuToggle />
            </NavItem >
            {/* <li style={{ alignItems: "flex-end" }}>
                <button className='btn btn-primary' onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}>Signup</button>
                <button className='btn btn-primary' onClick={() => navigate("/Accounts/login")} style={{ cursor: "pointer" }}>Login</button>
            </li> */}
        </ul >

    );
};

export default NavBar;