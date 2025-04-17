import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome, FaUserShield, FaBuilding, FaSyncAlt, FaShoppingCart } from "react-icons/fa";

const SubHeader = () => {
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    const navItemStyle = {
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        cursor: "pointer",
        color: "white",
        fontSize: "14px",
        gap: "6px",
        borderRadius: "5px",
        transition: "background 0.3s"
    };

    const navItems = [
        { path: "/", label: "Home", icon: <FaHome /> },
        { path: "/pages/role", label: "Role", icon: <FaUserShield /> },
        { path: "/Department/department", label: "Department", icon: <FaBuilding /> },
        { path: "/RoleAssigning/roleAssigning", label: "Role Assigning", icon: <FaUserShield /> },
        { path: "/pages/about", label: "About", icon: <FaUserShield /> }
    ];

    return (
        <div style={{
            backgroundColor: "#714252",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 10px",
            position: "sticky",
            top: "46px",
            zIndex: 999
        }}>
            <div style={{ display: "flex", gap: "20px" }}>
                {navItems.map((item, index) => (
                    <div key={index} style={navItemStyle} onClick={() => navigate(item.path)}>
                        {item.icon} {item.label}
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <FaShoppingCart
                    style={{ fontSize: "1.6rem", color: "orange", cursor: "pointer" }}
                    onClick={() => navigate("/cart")}
                />
                <FaSyncAlt
                    onClick={handleRefresh}
                    style={{ fontSize: "1.4rem", color: "white", cursor: "pointer" }}
                />
            </div>
        </div>
    );
};

export default SubHeader;
