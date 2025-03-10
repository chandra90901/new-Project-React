import React, { useState } from "react";

const Signup = ({ setPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFocus = (field) => {
    setShowTooltip({ ...showTooltip, [field]: true });
  };

  const handleBlur = (field) => {
    setShowTooltip({ ...showTooltip, [field]: false });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    setTimeout(() => setPage("login"), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>

      <form
        onSubmit={handleSignup}
        className="p-3 border rounded shadow bg-white"
      >
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Username", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Confirm Password", name: "confirmPassword", type: "password" },
          { label: "Phone Number", name: "phone", type: "tel" },
        ].map(({ label, name, type }) => (
          <div className="mb-3 position-relative" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              className={`form-control ${errors[name] ? "is-invalid" : ""}`}
              placeholder={`Enter your ${label.toLowerCase()}`}
              value={formData[name]}
              onChange={handleChange}
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              title={errors[name] || ""}
            />
            {showTooltip[name] && errors[name] && (
              <div className="tooltip-error">{errors[name]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <button className="btn btn-link p-0" onClick={() => setPage("login")}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;