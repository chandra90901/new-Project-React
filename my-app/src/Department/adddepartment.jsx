import React, { useEffect, useState } from "react";
import Input from "../Components/input";
import { useDispatch, connect } from "react-redux";
import { createDepartment, getDepartmentDetails } from "./departmentActions"

const AddDepartment = ({ show, onClose, onSave, saveFail, saveSuccess }) => {
    const [formData, setFormData] = useState({ departmentName: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
    };

    // const handleSave = () => {
    //     if (!formData.departmentName.trim()) {
    //         alert("please enter department name ")
    //         return;
    //     }
    //     onSave(formData.departmentName);
    //     setFormData({ departmentName: "" });
    //     onClose();
    // };

    const handleSave = async () => {
        if (!formData.departmentName.trim()) {
            setError(true);
            setMessage("Please enter department name");
            return;
        }

        try {
            // const response = await fetch("http://localhost:5001/api/department", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ departmentName: formData.departmentName }),
            // });
            await dispatch(createDepartment(formData.departmentName));
            await dispatch(getDepartmentDetails());
            // const data = await response.json();
            // if (response.ok) {
            setError(false);
            setMessage("Department saved successfully!");
            onSave(formData.departmentName);
            setFormData({ departmentName: "" });

            setTimeout(() => {
                onClose();
                setMessage("");
            }, 1500);
        }
        // else {
        //     setError(true);
        //     setMessage(data.message || "Failed to save department");
        // }
        catch (error) {
            console.error("Error:", error);
            setError(true);
            setMessage("Something went wrong!");
        }
    };

    useEffect(() => {
        if (saveSuccess) {
            setError(false);
            setMessage("Department saved successfully!");
            onSave(formData.departmentName);
            setFormData({ departmentName: "" });
            setTimeout(() => {
                onClose();
                setMessage("");

            }, 1500);
            dispatch(getDepartmentDetails());
        }
    }, [saveSuccess])

    useEffect(() => {
        if (saveFail) {
            alert("Save is failed")
        }
    }, [saveFail])


    if (!show) return null;
    const addDepartments = [
        { label: "Department Name", type: "text", name: "departmentName" }
    ];
    return (
        <div className="modal-overlay p-4 border rounded">
            <div className="modal-content" style={{ width: "78%", }}>
                <div style={{ width: "350px", padding: "20px", borderRadius: "8px" }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "15px",
                            background: "none",
                            border: "none",
                            fontSize: "1.6rem",
                            cursor: "pointer",
                            color: "#000",
                        }}
                    >
                        &times;
                    </button>
                    <h1 className="text-center">Add Department</h1>
                    {addDepartments.map((field) => (
                        <div key={field.name}>
                            <Input
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                            <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-primary" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                            {message && (
                                <div
                                    className={`mt-3 text-${error ? "danger" : "success"}`}
                                    style={{ fontSize: "14px" }}
                                >
                                    {message}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    saveSuccess: state.department.saveSuccess,
    saveFail: state.department.saveFail
})

const mapDispatchToProps = {
    createDepartment, getDepartmentDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);
