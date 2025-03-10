import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email) {
            setError("Email is required!");
            return;
        }

        if (!password) {
            setError("Password is required!");
            return;
        }

        setIsSubmitting(true);
        const storedEmail = localStorage.getItem("Email");
        const storedPassword = localStorage.getItem("Password");

        if (email === storedEmail && password === storedPassword) {
            alert("Login Successful!");
            navigate("./Home");
        } else {
            setError("Invalid credentials. Try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <div className="p-4 border rounded">
                <h1 className="text-center">Login</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password" />
                    <label htmlFor="password">Password</label>
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                <button className="btn btn-primary w-100" onClick={handleLogin} disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log in"}
                </button>

                <p className="text-center mt-3">
                    Need an account?{" "}
                    <span role="button" className="text-primary" onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
