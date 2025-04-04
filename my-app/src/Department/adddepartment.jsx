import React, { useState } from "react";
import Input from "../Components/input";

const AddDepartment = ({ show, onClose, onSave }) => {
    const [formData, setFormData] = useState({ departmentName: "" });

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = () => {
        if (!formData.departmentName.trim()) {
            alert("please enter department name ")
            return;
        }
        onSave(formData.departmentName);
        setFormData({ departmentName: "" });
        onClose();
    };

    if (!show) return null;
    const addDepartments = [
        { label: "Department Name", type: "text", name: "departmentName" }
    ];
    return (
        <div className="modal-overlay p-4 border rounded">
            <div className="modal-content" style={{ width: "32%", }}>
                <div style={{ width: "350px", padding: "20px", borderRadius: "8px" }}>
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
                            <button className="btn btn-primary w-100 mt-3" onClick={handleSave}>
                                Save
                            </button>
                            <button className="btn btn-secondary w-100 mt-2" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddDepartment;
