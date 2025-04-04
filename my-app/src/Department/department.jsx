
import React, { useState } from "react";
import AddDepartment from "../Department/adddepartment";
import "../Department/department.css"; // Import the CSS file
import signupImage from "../images/signup.jpg";
const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState(new Set());

    const handleAddDepartment = (newDepartments) => {
        setDepartments([...departments, { id: Date.now(), name: newDepartments }]);
    };

    const handleDeleteDepartment = (id) => {
        setDepartments(departments.filter((department) => department.id !== id));
    };

    const handleCheckboxChange = (id) => {
        setSelectedDepartments((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(id)) {
                updatedSelected.delete(id);
            } else {
                updatedSelected.add(id);
            }
            return updatedSelected;
        });
    };
    const divStyle = {
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${signupImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    const deleteselectRecord = () => {
        setDepartments(departments.filter((department) => !selectedDepartments.has(department.id)));
        setSelectedDepartments(new Set()); // Reset selection
    };

    return (
        <div style={divStyle}>
            <div className="container role-container">
                <div className="d-flex justify-content-end mb-3">
                    <button type="button" className="btn btn-primary btn-custom" onClick={() => setShowModal(true)}>
                        + Add Department
                    </button>
                    <button className="btn btn-danger btn-custom" onClick={deleteselectRecord}>
                        - Delete Selected
                    </button>
                </div>

                <table className="table table-striped table-hover role-table">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Select</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department, index) => (
                            <tr key={department.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={selectedDepartments.has(department.id)}
                                        onChange={() => handleCheckboxChange(department.id)}
                                    />
                                </td>
                                <td>{department.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDepartment(department.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <AddDepartment show={showModal} onClose={() => setShowModal(false)} onSave={handleAddDepartment} />
            </div>
        </div>
    );
};

export default Department;
