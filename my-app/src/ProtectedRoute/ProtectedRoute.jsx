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
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                alert("Session expired. Please log in again.");
                navigate("/Accounts/login");
                return;
            }

            // Token is valid
            setIsChecking(false);
        } catch (err) {
            localStorage.removeItem("token");
            alert("Invalid session. Please log in again.");
            navigate("/Accounts/login");
        }
    }, [navigate]);

    if (isChecking) return <div>Checking authentication...</div>;

    return children;
};

export default ProtectedRoute;
