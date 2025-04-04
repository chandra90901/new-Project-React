// useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn) {
//         navigate('/');
//     }
// }, [navigate]);
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import groceryCartIcon from "./images/grocery-cart_6715675.png";
// import MenuToggle from './Accounts/MenuToggle';
import Toggle from './sideToggle/leftbar';
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Profile from './Profile';
// import Profile from './Profile';

const NavBar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove auth token
        localStorage.removeItem("user");  // Remove user data
        navigate("/Accounts/login");      // Redirect to login page
    };
    return (
        <ul className="navbar navbar-expand-lg px-3 py-2"
            style={{ backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "space-between", listStyle: "none" }}>
            <li className="me-4" style={{ display: "flex", alignItems: "center" }}>
                <FaBars onClick={toggleSidebar} style={{ fontSize: "1.8rem", color: "white", cursor: "pointer", marginRight: "10px" }} />
            </li>
            <li> <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white", alignItems: "center" }}>
                <img src={groceryCartIcon} alt="icon" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
                Ram Super Market
            </span></li>
            <li className="mx-3">
                <Toggle isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </li>
            <li className="mx-3">
                < FaUserCircle onClick={toggleProfile} style={{ fontSize: "2rem", color: "white", cursor: "pointer" }} />
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" onClick={toggleProfile} style={{ fontSize: "2rem", color: "white", cursor: "pointer" }} >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg> */}
                <Profile show={showProfile} onClose={toggleProfile} />
                <FaSignOutAlt onClick={handleLogout} style={{ fontSize: "2rem", color: "white", cursor: "pointer" }}
                    title="Logout"
                />
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={handleLogout} style={{ fontSize: "6rem", color: "white", cursor: "pointer" }}
                    title="Logout">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg> */}
            </li>
        </ul>
    );
};

export default NavBar;
