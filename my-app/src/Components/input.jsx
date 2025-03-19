import React, { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { nameValidation, emailValidation, passwordValidation, confirmPasswordValidation, phoneValidation, userNameValidation } from './validation';

const Input = ({ label, type, name, value, error, onChange, relatedValue, validators }) => {
    const [fieldTitle, setFieldTitle] = useState("");
    // const [validationError, setValidationError] = useState("");
    const onChangeValue = (e) => {
        let error = true;
        let errorMessage = "";
        const value = e.target.value;
        if (validators?.length > 0) {

            validators?.forEach((validator) => {
                // setFieldTitle = "";
                if (validator === "name") {
                    errorMessage = nameValidation(value);
                } else if (validator === "username") {
                    errorMessage = userNameValidation(value);
                } else if (validator === "email") {
                    errorMessage = emailValidation(value);
                } else if (validator === "password") {
                    errorMessage = passwordValidation(value);
                } else if (validator === "confirmPassword") {
                    errorMessage = confirmPasswordValidation(value, relatedValue);
                } else if (validator === "phone") {
                    errorMessage = phoneValidation(value);
                }
                if (errorMessage) {
                    error = false;
                }
            });

        }
        setFieldTitle(errorMessage);
        onChange(value, error, name);
    }

    return (
        <div className="mb-3 position-relative">
            <input
                type={type}
                className="form-control"
                style={{
                    border: error ? "1px solid red" : "1px solid black",
                    paddingRight: error ? "2.5rem" : "0.75rem",
                }}
                id={name}
                placeholder={label}
                name={name}
                value={value}
                onChange={onChangeValue}
                onBlur={onChangeValue}
                title={fieldTitle}
            />
            {error && (
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
