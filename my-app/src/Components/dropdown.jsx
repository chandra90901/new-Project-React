import React from "react";

const Dropdown = ({ label, name, value, options, onChange }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <select className="form-select" name={name} value={value} onChange={onChange}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
