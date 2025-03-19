import React from "react";
const nameValidation = (value) => {
    if (!value.trim()) {
        return { isValid: false, message: "Name is required." };
    }
    if (!/^[a-zA-Z ]+$/.test(value)) {
        return { isValid: false, message: "Name should contain only letters and spaces." };
    }
    return { isValid: true, message: "" };
};

const userNameValidation = (value) => {
    const pattern = /^[a-zA-Z0-9_]{3,16}$/;
    if (pattern.test(value)) {
        return { isValid: true, message: "" };
    } else {
        return { isValid: false, message: "Invalid username: Must be 3-16 characters long and contain only letters, numbers, or underscores." };
    }
};

const emailValidation = (value) => {
    const pattern = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
    if (pattern.test(value)) {
        return { isValid: true, message: "" };
    } else {
        return { isValid: false, message: "Invalid email format." };
    }
};

const passwordValidation = (value) => {
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,16}$/;
    if (pattern.test(value)) {
        return { isValid: true, message: "" };
    } else {
        return { isValid: false, message: "Password must be 8-16 characters, include one uppercase letter, one special character, and one number." };
    }
};

const confirmPasswordValidation = (value, password) => {
    if (value === password) {
        return { isValid: true, message: "" };
    } else {
        return { isValid: false, message: "Passwords do not match." };
    }
};

const phoneValidation = (value) => {
    const pattern = /^[0-9]{10}$/;
    if (pattern.test(value)) {
        return { isValid: true, message: "" };
    } else {
        return { isValid: false, message: "Phone number must be exactly 10 digits." };
    }
};

export { nameValidation, userNameValidation, emailValidation, passwordValidation, confirmPasswordValidation, phoneValidation };
