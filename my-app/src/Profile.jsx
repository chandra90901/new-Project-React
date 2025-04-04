import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = ({ show, onClose }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/Accounts/login");
        }
    }, [navigate]);

    if (!show) return null;
    // onClick={onClose}
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" onClick={onClose} style={{ position: "absolute", right: "20px", transform: "translateY(-50%)", fontSize: "100px", color: "black" }}>
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
                <h2>Profile</h2>
                {user ? (
                    < div >
                        <p><strong>First Name:</strong> {user.firstname}</p>
                        <p><strong>Last Name:</strong> {user.lastname}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}

            </div>
        </div >
    );
};

export default Profile;
