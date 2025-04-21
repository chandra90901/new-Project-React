import React, { useState } from "react";
import Input from "../../Components/input";
import { postRoles, getRoleDetails } from './rolesActions';
import { useDispatch, connect } from "react-redux";

const AddRoles = ({ props, show, onClose, onSave }) => {
    const [formData, setFormData] = useState({ roleName: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        if (!formData.roleName.trim()) {
            setError(true);
            setMessage("Please enter Role name");
            return;
        }

        try {
            // const response = await fetch("http://localhost:5001/api/role", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ roleName: formData.roleName }),
            // });
            dispatch(postRoles(formData.roleName))
            dispatch(getRoleDetails())
            // const data = await response.json();
            // if (response.ok) {
            setError(false);
            setMessage("Role saved successfully!");
            onSave(formData.roleName);
            setFormData({ roleName: "" });
            setTimeout(() => {
                onClose();
                setMessage("");
            }, 1500);
        }
        //  else {
        //     setError(true);
        //     setMessage(data.message || "Failed to save role");
        // }
        catch (error) {
            console.error("Error:", error);
            setError(true);
            setMessage("Something went wrong!");
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ width: "350px", position: "relative" }}>

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

                <h4 className="text-center mb-4">Add Role</h4>

                <Input
                    label="Role Name"
                    type="text"
                    name="roleName"
                    value={formData.roleName}
                    onChange={handleChange}
                />

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-4" onClick={handleSave}>
                        Save
                    </button>
                </div>

                {/* Message display */}
                {message && (
                    <div
                        className={`mt-3 mr-2 text-${error ? "danger" : "success"}`}
                        style={{ fontSize: "14px" }}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    fetchRolesDataSuccess: state.role.fetchRolesDataSuccess,
    fetchRolesDataFail: state.role.fetchRolesDataFail,
});

const mapDispatchToProps = {
    getRoleDetails,
    postRoles

};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoles);
