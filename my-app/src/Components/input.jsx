
import React, { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { firstNameValidation, lastNameValidation, emailValidation, passwordValidation, confirmPasswordValidation, phoneValidation, userNameValidation } from './validation';
const Input = ({ label, type, name, value, error, onChange, relatedValue, validators }) => {
    const [fieldError, setFieldError] = useState("");

    const validateInput = (value) => {
        let validationResult = { isValid: true, message: "" };

        if (validators?.length > 0) {
            for (const validator of validators) {
                if (validator === "firstname") validationResult = firstNameValidation(value);
                else if (validator === "lastname") validationResult = lastNameValidation(value);
                else if (validator === "username") validationResult = userNameValidation(value);
                else if (validator === "email") validationResult = emailValidation(value);
                else if (validator === "password") validationResult = passwordValidation(value);
                else if (validator === "confirmPassword") validationResult = confirmPasswordValidation(value, relatedValue);
                else if (validator === "phone") validationResult = phoneValidation(value);

                if (!validationResult.isValid) break;
            }
        }

        return validationResult;
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const validation = validateInput(value);

        setFieldError(validation.message);
        onChange(value, validation.isValid, name);
    };

    return (
        <div className="mb-3 position-relative">
            <input
                type={type}
                className="form-control"
                style={{
                    border: fieldError ? "1px solid red" : "1px solid black",
                    paddingRight: fieldError ? "2.5rem" : "0.75rem",
                }}
                id={name}
                placeholder={label}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleChange}
                title={fieldError}
            />
            {fieldError && (
                <BsExclamationCircle
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "red",
                    }}
                />
            )}
        </div>
    );
};

export default Input;