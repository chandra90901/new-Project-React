import React, { useState } from "react";
import Input from "../../Components/input";

const AddRoles = ({ show, onClose, onSave }) => {
    const [formData, setFormData] = useState({ roleName: "" });

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = () => {
        if (!formData.roleName.trim()) {
            alert("please enter Role name ")
            return;
        }
        onSave(formData.roleName);
        setFormData({ roleName: "" });
        onClose();
    };

    if (!show) return null;
    const addRoles = [
        { label: "Role Name", type: "text", name: "roleName" }
    ];
    return (
        <div className="modal-overlay p-4 border rounded">
            <div className="modal-content" style={{ width: "32%", }}>
                <div style={{ width: "350px", padding: "20px", borderRadius: "8px" }}>
                    <h1 className="text-center">Add Role</h1>
                    {addRoles.map((field) => (
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

export default AddRoles;
