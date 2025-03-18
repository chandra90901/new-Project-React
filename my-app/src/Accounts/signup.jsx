import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/input";
import {
    userNameValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
    phoneValidation
} from "../Components/validation";

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
        setError({ ...error, [key]: isValid });
    };

    const validateForm = () => {
        // const { value, password } = e.target.value;
        let newErrors = {};
        // if (!formData.name){
        //  newErrors.name = "Full Name is required.";
        const usernameCheck = userNameValidation(formData.username);
        if (!usernameCheck.isValid) {
            newErrors.username = usernameCheck.message;
        } else {
            delete newErrors.username;
        }

        const emailCheck = emailValidation(formData.email);
        if (!emailCheck.isValid) {
            newErrors.email = emailCheck.message;
        }
        else {
            delete newErrors.email;
        }
        const passwordCheck = passwordValidation(formData.password);
        if (!passwordCheck.isValid) {
            newErrors.password = passwordCheck.message;
        }
        else {
            delete newErrors.password;
        }
        const confirmPasswordCheck = confirmPasswordValidation(formData.confirmPassword, formData.password);
        if (!confirmPasswordCheck.isValid) {
            newErrors.confirmPassword = confirmPasswordCheck.message;
        }
        else {
            delete newErrors.confirmPassword;
        }
        const phoneCheck = phoneValidation(formData.phone);
        if (!phoneCheck.isValid) {
            newErrors.phone = phoneCheck.message;
        }
        else {
            delete newErrors.phone;
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
        { label: "Full Name", type: "text", name: "name" },
        { label: "Username", type: "text", name: "username", validators: ["mandatory", "userNameValidation"] },
        { label: "Email", type: "email", name: "email" },
        { label: "Password", type: "password", name: "password" },
        { label: "Confirm Password", type: "password", name: "confirmPassword" },
        { label: "Phone Number", type: "text", name: "phone" }
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
