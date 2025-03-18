import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userNameValidation, emailValidation, passwordValidation } from "../Components/validation";
import Input from "../Components/input";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };
    const validateForm = () => {
        let newErrors = {};

        const emailCheck = emailValidation(formData.email);
        if (!emailCheck.isValid) {
            newErrors.email = emailCheck.message;
        } else {
            delete newErrors.email;
        }

        const passwordCheck = passwordValidation(formData.password);
        if (!passwordCheck.isValid) {
            newErrors.password = passwordCheck.message;
        } else {
            delete newErrors.password;
        }

        newErrors.userName = !formData.userName ? "Username is required" : "";

        setError(newErrors);
        return Object.keys(newErrors).every(key => !newErrors[key]);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // setTimeout(() => {
        const storedEmail = localStorage.getItem("Email");
        const storedPassword = localStorage.getItem("Password");

        if (formData.email === storedEmail && formData.password === storedPassword) {
            alert("Login Successful!");
            navigate("/");
        } else {
            setError({ email: "Invalid credentials.", password: "Invalid credentials." });
        }

        setIsSubmitting(false);
        // }, 1000);
    }

    const inputFields = [
        // { label: "Username", type: "text", name: "username" },
        { label: "Email", type: "email", name: "email" },
        { label: "Password", type: "password", name: "password" }
    ];

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <div className="p-4 border rounded">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleLogin}>
                    {inputFields.map((field) => (
                        <div key={field.name}>
                            <Input
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                error={error[field.name]}
                            />
                            {/* {error[field.name] && <p className="text-danger">{error[field.name]}</p>} */}
                        </div>
                    ))}
                    <button className="btn btn-primary w-100 mt-2" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                </form>
                <p className="text-center mt-3">
                    Need an account?{" "}
                    <span role="button" className="text-primary" onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}>
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
