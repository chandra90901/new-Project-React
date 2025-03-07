import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = () => {
        if (password !== reenterPassword) {
            return (
                alert("Not match your Password")
            );
        }
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
        alert("Sign-up successful! You can now log in.");
        navigate("/Transport/login");
    }
    return (
        <div className="mt-5 mb-5">
            <div className="container p-4" style={{ border: '1px solid black', borderRadius: "5px", maxWidth: "400px" }}>
                <h1 className="text-center">Sign Up</h1>
                <br />
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="reenterpassword" placeholder="Re-enter Your Password" value={reenterPassword} onChange={(e) => setReenterPassword(e.target.value)} />
                    <label htmlFor="reenterpassword">Re-enter Password</label>
                </div>
                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary w-100" onClick={handleSignUp}>Sign Up</button>
                </div>
                <small className="text-muted">
                    Already have an account? <a href="/Transport/login">Login</a>
                </small>
            </div>
        </div>
    );
};
export default SignUp;