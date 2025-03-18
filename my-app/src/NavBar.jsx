import React from 'react';
import { useNavigate } from "react-router-dom";
import Pages from './pages/Pages';
import Home from './Home';
import Shop from './Shop/shop';
import MenuToggle from './Accounts/MenuToggle';

const NavBar = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const isLoggedIn = localStorage.getItem('isLoggedIn');
    //     if (isLoggedIn) {
    //         navigate('/');
    //     }
    // }, [navigate]);

    return (
        <ul className="navbar navbar-expand-lg px-3 py-2" style={{ backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "space-between", listStyle: "none", borderRadius: "12px" }}>
            <li className="me-4" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>Ram Super Market</li>
            <div style={{ display: "flex", alignItems: "center" }}>
                <li className="mx-3">
                    <Pages />
                </li>
                <li className="mx-3">
                    <Shop />
                </li>
            </div>
            <li className="mx-3">
                <MenuToggle />
            </li>
        </ul>
    );
};

export default NavBar;
