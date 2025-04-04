import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/Accounts/login");
            return;
        }

        try {
            const decoded = jwtDecode(token); // Decode the token
            const currentTime = Date.now() / 1000; // Current time in seconds

            // Check if token is expired
            if (decoded.exp < currentTime) {
                localStorage.removeItem("token"); // Remove expired token
                alert("Your session has expired. Please log in again.");
                navigate("/Accounts/login"); // Redirect to login page
                return;
            }
        } catch (error) {
            localStorage.removeItem("token"); // Handle decoding errors
            alert("Session invalid. Please log in again.");
            navigate("/Accounts/login"); // Redirect to login page
            return;
        }

        setIsChecking(false); // Token check is complete
    }, [navigate]);

    if (isChecking) return <div>Loading...</div>; // Show loading while checking

    return children;
};

export default ProtectedRoute;
