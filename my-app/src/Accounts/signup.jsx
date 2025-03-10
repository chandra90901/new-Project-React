import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSignup = () => {
        setError("");

        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        localStorage.setItem("Email", email.trim());
        localStorage.setItem("Password", password);

        alert("Signup Successful!");
        navigate("/Accounts/login");
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <div className="p-4 border rounded">
                <h1 className="text-center">Sign Up</h1>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value.trim())}
                        autoComplete="email" />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password" />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                {error && <p className="text-danger text-center">{error}</p>}

                <button className="btn btn-primary w-100" onClick={handleSignup} disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <span role="button" className="text-primary" onClick={() => navigate("/Accounts/login")} style={{ cursor: "pointer" }}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
