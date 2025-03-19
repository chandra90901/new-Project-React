import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/input";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
        setError({ ...error, [key]: !isValid });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(error).some(error => error);
        if (hasErrors) {
            alert("Please fix the errors before submitting.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            localStorage.setItem("Username", formData.username);
            localStorage.setItem("Email", formData.email);
            localStorage.setItem("Password", formData.password);

            alert("Signup Successful!");
            navigate("/Accounts/login");
        }, 1000);
    };

    const inputFields = [
        { label: "Full Name", type: "text", name: "name", validators: ["name"] },
        { label: "Username", type: "text", name: "username", validators: ["username"] },
        { label: "Email", type: "email", name: "email", validators: ["email"] },
        { label: "Password", type: "password", name: "password", validators: ["password"] },
        { label: "Confirm Password", type: "password", name: "confirmPassword", validators: ["confirmPassword"] },
        { label: "Phone Number", type: "text", name: "phone", validators: ["phone"] }
    ];

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <div className="p-4 border rounded">
                <h1 className="text-center">Sign Up</h1>
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
