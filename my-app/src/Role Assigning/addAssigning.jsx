import React, { useState, useEffect } from "react";
import "./assigning.css";
import Dropdown from "../Components/dropdown";

const AddRoleAssigning = ({ selectedUser, show = true, onClose, onSave, user }) => {
    const [formData, setFormData] = useState({
        id: user.id || "",
        username: user.username || "",
        roleName: user.roleName || "",
        department: user.department || ""
    });

    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5001/api/role")
            .then((res) => res.json())
            .then((data) => {
                setRoles(data.map((r) => ({
                    label: r.roleName,
                    value: r.roleName
                })));
            });

        fetch("http://localhost:5001/api/department")
            .then((res) => res.json())
            .then((data) => {
                setDepartments(data.map((d) => ({
                    label: d.departmentName,
                    value: d.departmentName
                })));
            });
    }, []);

    const handleChange = (value, key) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/role-assign/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roleName: formData.roleName,
                    department: formData.department,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Role assigned successfully");
                setError(false);
                if (onSave) onSave();
                onClose();
            } else {
                setMessage(result.message || "Something went wrong");
                setError(true);
            }
        } catch (error) {
            console.error("Error saving role assignment:", error);
            setMessage("Error connecting to the server");
            setError(true);
        }
    };


    if (!show) return null;

    return (
        <div className="modal-overlay p-5 border rounded">
            <div className="modal-content" style={{ width: "78%" }}>
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
                    <h4 className="text-center">Assign Role</h4>

                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control"
                            value={formData.username}
                            readOnly
                        />
                    </div>

                    <div className="mb-2">
                        <Dropdown
                            label="Role Name"
                            name="roleName"
                            value={formData.roleName}
                            options={roles}
                            onChange={(e) => handleChange(e.target.value, "roleName")}
                        />
                    </div>

                    <div className="mb-2">
                        <Dropdown
                            label="Department Name"
                            name="department"
                            value={formData.department}
                            options={departments}
                            onChange={(e) => handleChange(e.target.value, "department")}
                        />
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                    {message && (
                        <div
                            className={`mt - 3 text - ${error ? "danger" : "success"}`}
                            style={{ fontSize: "14px" }}
                        >
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddRoleAssigning;
