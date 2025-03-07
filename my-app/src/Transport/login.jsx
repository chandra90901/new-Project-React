import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedEmail = localStorage.getItem("Email");
        const storedPassword = localStorage.getItem("Password");

        if (email === storedEmail && password === storedPassword) {
            alert("Login Successful!");
        } else {
            alert("Invalid Credentials!");
        }
    };

    return (
        <div className="mt-5 mb-5">
            <div className="container p-4" style={{{...error ? { border: '1px solid black' } : { border: '1px solid black' }}, borderRadius: "5px", maxWidth: "400px" }}>
            <h1 className="text-center">Login</h1>
            <br />
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
            </div>
            <div className="mb-3 text-center">
                <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>Log in</button>
            </div>
            <small className="text-muted">
                Need an account? <a href="/Transport/signup">Sign Up</a>
            </small>
        </div>
        </div >
    );
};

export default Login;