import React, { useState, useEffect } from "react";
import AddRoleAssigning from "../Role Assigning/addAssigning";
import Table from 'react-bootstrap/Table';
import roleImage from "../images/unnamed.jpg";

const RoleAssigning = () => {
    const [formData, setFormData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/role-assign");
            const data = await res.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (employee) => {
        setSelectedUser(employee);
        setShowModal(true);
    };
    const divStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${roleImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
    };
    const containerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        padding: "20px"
    };
    return (
        <div>
            <div style={divStyle}></div>
            <div className="container mt-4" style={containerStyle}>
                <h4 className="text-center">Role Assigning</h4>
                <div className="table-responsive">
                    <Table bordered hover responsive size="sm" className="table bg-white shadow-sm rounded">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Employee Name</th>
                                <th>Role Name</th>
                                <th>Department</th>
                                <th>Assign Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.roleName}</td>
                                    <td>{user.department}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm me-2"
                                            onClick={() => handleEditClick(user)}
                                            title="Edit"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="blue"
                                                style={{ borderRadius: "9%", border: "2px solid black" }}
                                                className="bi bi-pencil-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.854.146a.5.5 0 0 1 .11.53l-.39 1.56a.5.5 0 0 1-.448.354l-1.56.39a.5.5 0 0 1-.53-.11L6.293 6.707l-1.793 1.793a1 1 0 0 0-.293.707V11h2.5a1 1 0 0 0 .707-.293l1.793-1.793 5.304-5.305a.5.5 0 0 1 .354-.146z" />
                                            </svg>
                                        </button>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {showModal && selectedUser && (
                    <AddRoleAssigning
                        user={selectedUser}
                        onClose={() => setShowModal(false)}
                        onSave={fetchData}
                    />
                )}
            </div>
        </div>
    );
};

export default RoleAssigning;
