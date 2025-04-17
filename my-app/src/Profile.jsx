import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = ({ show, onClose }) => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ username: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setUser(userObj);
            setFormData({
                username: userObj.username || "",
                email: userObj.email || ""
            });
        } else {
            navigate("/Accounts/login");
        }
    }, [navigate]);

    if (!show) return null;

    return (
        <div className="profile-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className="profile-title">User Profile</h2>
                <div className="profile-details">
                    <p><strong>First Name:</strong> {user.firstname}</p>
                    <p><strong>Last Name:</strong> {user.lastname}</p>
                    <p><strong>user Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
