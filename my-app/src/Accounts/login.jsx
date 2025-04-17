import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/input";
import loginImage from "../images/shopping-1165437_1280.jpg";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const divStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
    };

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
        setError({ ...error, [key]: isValid ? "" : "Invalid input" });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setError({});

        if (Object.values(error).some((err) => err)) {
            alert("Please fix the errors before submitting.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (!data.token || !data.user) {
                throw new Error("Invalid response, login failed.");
            }

            // Store token and user details in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setSuccessMessage("Login Successful!");
            setTimeout(() => navigate("/"), 1000); // Redirect after a delay

        } catch (error) {
            console.error("Login error:", error);
            setError({ general: error.message || "Error logging in. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputFields = [
        { label: "Email", type: "email", name: "email", validators: ["email"] },
        { label: "Password", type: "password", name: "password", validators: ["password"] },
    ];

    return (
        <div>
            <div style={divStyle}></div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className="p-4 border rounded" style={{ width: "350px", backgroundColor: "white", borderRadius: "8px" }}>
                    <h1 className="text-center">Login</h1>
                    {inputFields.map((field) => (
                        <div key={field.name}>
                            <Input
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                error={error[field.name]}
                                validators={field.validators}
                            />
                        </div>
                    ))}
                    <button className="btn btn-primary w-100 mt-2" onClick={handleLogin} disabled={isSubmitting}>
                        Log in
                    </button>
                    {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
                    {error.general && <p className="text-danger text-center mt-3">{error.general}</p>}
                    <p className="text-center mt-3">
                        Need an account?{" "}
                        <span
                            role="button" className="text-primary" onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}                    >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
