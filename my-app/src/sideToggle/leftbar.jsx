import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome, FaUserShield, FaBuilding, FaArrowLeft } from "react-icons/fa";

const Toggle = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    // Detect outside clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar(); // Close sidebar
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);

    const styles = {
        navItem: {
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            cursor: "pointer",
            transition: "background 0.3s",
            borderRadius: "5px",
            color: "white"
        },
        icon: {
            marginRight: "12px",
            fontSize: "18px"
        }
    };

    return (
        <div
            ref={sidebarRef}
            style={{
                position: "fixed",
                top: '50px',
                left: 0,
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease-in-out",
                width: "190px",
                height: "100vh",
                backgroundColor: "#778",
                color: "white",
                zIndex: 1000,
                boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
                overflowY: "auto"
            }}
        >
            {/* Close Button */}
            <button onClick={toggleSidebar}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px",
                    position: "absolute",
                    right: "10px",
                    top: "10px"
                }}>
                <FaArrowLeft size={20} color="white" />
            </button>

            {/* Navigation List */}
            <ul style={{ listStyle: "none", marginTop: "60px", padding: "0 10px" }}>
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
                <li style={styles.navItem} onClick={() => navigate("/RoleAssigning/roleAssigning")}>
                    <FaUserShield style={styles.icon} /> Role Assigning
                </li>
            </ul>
        </div>
    );
};

export default Toggle;
