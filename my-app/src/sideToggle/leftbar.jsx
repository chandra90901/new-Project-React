import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome, FaUserShield, FaBuilding, FaArrowLeft } from "react-icons/fa";
const Toggle = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const styles = {
        navItem: {
            display: "flex", alignItems: "center", padding: "10px", cursor: "pointer", transition: "0.3s", borderRadius: "5px"
        },
        icon: {
            marginRight: "10px", fontSize: "18px"
        }
    };
    return (
        <div
            style={{
                position: "fixed", top: 0, left: isOpen ? 0 : "-250px", width: "250px", height: "100vh", backgroundColor: "#222", color: "white", transition: "left 0.3s ease-in-out", padding: "20px",
                boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}
        >
            <button onClick={toggleSidebar}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "5px",
                    position: "absolute",
                    right: "15px",
                    top: "15px"
                }}>
                <FaArrowLeft size={24} color="white" />
            </button>
            <ul style={{ listStyle: "none", padding: "20px" }}>
                <li style={styles.navItem} onClick={() => navigate("/")}>
                    <FaHome style={styles.icon} /> Home
                </li>
                <li style={styles.navItem} onClick={() => navigate("/pages/about")}>
                    <FaUserShield style={styles.icon} /> About
                </li>
                <li style={styles.navItem} onClick={() => navigate("/pages/role")}>
                    <FaUserShield style={styles.icon} /> Role
                </li>
                <li style={styles.navItem} onClick={() => navigate("/Department/department")}>
                    <FaBuilding style={styles.icon} /> Department
                </li>
            </ul>
        </div>
    );
};

export default Toggle;
