import React from "react";

function FormValidators() {
    const userNameValidation = (value) => {
        const pattern = /^[a-zA-Z0-9_]{3,16}$/;
        if (pattern.test(value)) {
            return { isValid: true, message: "" };
        } else {
            return { isValid: false, message: "Invalid username: Must be 3-16 characters long and contain only letters, numbers, or underscores." };
        }
    };
}

export default FormValidators;