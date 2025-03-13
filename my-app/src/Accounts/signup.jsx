import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email) => /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
    const isValidUsername = (username) => /^(?![_-])[a-zA-Z0-9_-]{8,16}(?<![_-])$/.test(username);
    const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,16}$/.test(password);
    const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

    const handleSignup = () => {
        setError("");

        if (!name || !username || !email || !password || !confirmPassword || !phone) {
            setError("All fields are required.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format.");
            return;
        }

        if (!isValidUsername(username)) {
            setError("Username must be 8-16 characters, alphanumeric with '-' or '_', and cannot start or end with special characters.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Password must be 8-16 characters with at least one uppercase letter, one special character, and one number.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!isValidPhone(phone)) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }

        setIsSubmitting(true);
        localStorage.setItem("Username", username);
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);

        alert("Signup Successful!");
        navigate("/Accounts/login");
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <div className="p-4 border rounded">
                <h1 className="text-center">Sign Up</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Full Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label htmlFor="phone">Phone Number</label>
                </div>

                {error && <p className="text-danger text-center">{error}</p>}

                <button className="btn btn-primary w-100" onClick={handleSignup} disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>

                <p className="text-center mt-3">
                    Already have an account? <span role="button" className="text-primary" onClick={() => navigate("/Accounts/login")} style={{ cursor: "pointer" }}>Log in</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;