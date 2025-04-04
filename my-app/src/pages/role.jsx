// import React, { useState } from "react";
// import Adddetails from "../pages/role/roleadd";
// const Role = () => {
//     const [roles, setRoles] = useState([]);
//     const [showModal, setShowModal] = useState(false);

//     const handleAddRole = (newRole) => {
//         setRoles([...roles, { id: Date.now(), name: newRole }]);
//     };

//     const handleDeleteRole = (id) => {
//         setRoles(roles.filter((role) => role.id !== id));
//     };

//     const selectedRow = () => {
//         setRoles(roles.filter((role) => role.id !== id));

//     }
//     const deleteselectRecord = () => {
//         setRoles([]);
//     }

//     return (
//         <div>
//             <div className="d-flex justify-content-end mb-3">
//                 <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)} style={{ marginRight: "400px" }}>
//                     +
//                 </button>
//                 <button className='btn btn-danger' id="delete-all" onClick={deleteAllRecord} style={{ marginLeft: '5px' }}>-</button>
//             </div>

//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Check Box</th>
//                         <th>Role Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {roles.map((role, index) => (
//                         <tr key={role.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                                 <input type="checkbox" onClick={selectedRow} id={index} />
//                             </td>
//                             <td>{role.name}</td>
//                             <td>
//                                 <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRole(role.id)}>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <Adddetails show={showModal} onClose={() => setShowModal(false)} onSave={handleAddRole} />
//         </div>
//     );
// };

// export default Role

import React, { useState } from "react";
import AddRoles from "../pages/role/roleadd";
import "./role.css"; // Import the CSS file

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState(new Set());

    const handleAddRole = (newRole) => {
        setRoles([...roles, { id: Date.now(), name: newRole }]);
    };

    const handleDeleteRole = (id) => {
        setRoles(roles.filter((role) => role.id !== id));
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

    const deleteselectRecord = () => {
        setRoles(roles.filter((role) => !selectedRoles.has(role.id)));
        setSelectedRoles(new Set()); // Reset selection
    };

    return (
        <div className="container role-container">
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-primary btn-custom" onClick={() => setShowModal(true)}>
                    + Add Role
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
                        <th>Role Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr key={role.id}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedRoles.has(role.id)}
                                    onChange={() => handleCheckboxChange(role.id)}
                                />
                            </td>
                            <td>{role.name}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRole(role.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddRoles show={showModal} onClose={() => setShowModal(false)} onSave={handleAddRole} />
        </div>
    );
};

export default Role;
