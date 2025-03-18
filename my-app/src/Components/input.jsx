import React, { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { userNameValidation } from './validation';

const Input = ({ label, type, name, value, error, onChange, onBlur, validators }) => {
    const [fieldTitle, setFieldTitle] = useState("")
    const onChangeValue = (e) => {
        let error = false;
        const value = e.target.value;
        if (validators?.length > 0) {
            validators.forEach(validator => {

                if (formValidator[validator]) {

                }
                if (validator === "mandatory") {
                    if (!value) {
                        error = true;
                        setFieldTitle("Please configure")
                    } else {
                        error = false;
                        setFieldTitle("")
                    }
                }
            })
        }
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
                onBlur={onChangeValue} // Validate on field blur
                title={fieldTitle} // Show error as a tooltip
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
