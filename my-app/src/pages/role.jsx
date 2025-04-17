import React, { useState, useEffect } from "react";
import AddRoles from "../pages/role/roleadd";
import "./role.css";
import Table from 'react-bootstrap/Table';
import roleImage from "../images/unnamed.jpg";
import { getRoleDetails } from './role/rolesActions'
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";

const Role = (props) => {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState(new Set());
    const dispatch = useDispatch();
    useEffect(() => {
        // fetch("http://localhost:5001/api/role")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setRoles(data);
        //     })
        //     .catch((err) => {
        //         console.error("Error loading roles:", err);
        //     });
        dispatch(getRoleDetails());
    }, []);

    useEffect(() => {
        if (props?.rolesData?.length > 0) {
            setRoles(props.rolesData);
        }
    }, [props?.rolesData])
    const handleAddRole = (newRole) => {
        setRoles([...roles, { id: Date.now(), name: newRole }]);
    };

    // const handleDeleteRole = (id) => {
    //     setRoles(roles.filter((role) => role.id !== id));
    // };

    const handleDeleteRole = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/role/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Update UI after successful delete
                setRoles(roles.filter((role) => role.id !== id));
                alert("successfully deleted")
            } else {
                const errorData = await response.json();
                console.error("Delete failed:", errorData.message);
                alert("Failed to delete role: " + errorData.message);
            }
        } catch (error) {
            console.error("Error deleting role:", error);
            alert("Error deleting role");
        }
    };


    const handleCheckboxChange = (id) => {
        setSelectedRoles((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(id)) {
                updatedSelected.delete(id);
            } else {
                updatedSelected.add(id);
            }
            return updatedSelected;
        });
    };

    // const deleteselectRecord = () => {
    //     setRoles(roles.filter((role) => !selectedRoles.has(role.id)));
    //     setSelectedRoles(new Set()); // Reset selection
    // };
    const deleteselectRecord = async () => {
        const idsToDelete = Array.from(selectedRoles);

        if (idsToDelete.length === 0) {
            alert("Please select at least one role to delete.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/role/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: idsToDelete }),
            });

            const data = await response.json();

            if (response.ok) {
                setRoles(roles.filter((role) => !selectedRoles.has(role.id)));
                setSelectedRoles(new Set());
            } else {
                alert(data.message || "Failed to delete selected roles");
            }
        } catch (error) {
            console.error("Error deleting selected roles:", error);
            alert("Error deleting selected roles");
        }
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
    return (
        <div>
            <div style={divStyle}></div>
            <div className="container role-container">
                <div>  <h4 className="text-center">Role</h4></div>
                <div className="d-flex justify-content-end mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" fill="green" className="bi bi-plus-square-fill" viewBox="0 0 16 16" onClick={() => setShowModal(true)}>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16" onClick={deleteselectRecord}>
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </div>

                <Table bordered hover responsive size="sm" className="table bg-white shadow-sm rounded">
                    <thead className="table-dark text-center">
                        <tr>
                            <th style={{ width: "70%" }}>Role Name</th>
                            <th style={{ width: "30%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input
                                        type="checkbox"
                                        style={{ borderRadius: "10px", border: "2px solid black" }}
                                        className="form-check-input"
                                        checked={selectedRoles.has(role.id)}
                                        onChange={() => handleCheckboxChange(role.id)}
                                    />{role.roleName}</td>
                                <td>
                                    <button className="btn btn-sm me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16" onClick={() => handleDeleteRole(role.id)}>
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <AddRoles show={showModal} onClose={() => setShowModal(false)} onSave={handleAddRole} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    rolesData: state.role.rolesData,
});

const mapDispatchToProps = {
    getRoleDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
