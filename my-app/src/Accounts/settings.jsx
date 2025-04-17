import React, { useState, useEffect } from "react";

const Settings = ({ show, onClose }) => {
    const [formData, setFormData] = useState({ username: "", email: "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setFormData(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/updateUser/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Update failed");

            localStorage.setItem("user", JSON.stringify(data.updatedUser));
            setSuccess("Profile updated successfully!");
            setError("");
        } catch (err) {
            console.error(err);
            setError(err.message);
            setSuccess("");
        }
    };


    if (!show) return null;

    return (
        <div className="profile-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className="profile-title">User Settings</h2>

                <div className="form-group mt-3">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-success mt-3" onClick={handleSave}>
                    Save Changes
                </button>

                {success && <p className="text-success mt-3">{success}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default Settings;
