// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Input from "../Components/input";

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         phone: "",
//     });

//     const [error, setError] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (value, isValid, key) => {
//         setFormData({ ...formData, [key]: value });
//         setError({ ...error, [key]: !isValid });
//     };

//     const handleSignup = (e) => {
//         e.preventDefault();
//         const hasErrors = Object.values(error).some(error => error);
//         if (hasErrors) {
//             alert("Please fix the errors before submitting.");
//             return;
//         }

//         setIsSubmitting(true);
//         setTimeout(() => {
//             localStorage.setItem("Username", formData.username);
//             localStorage.setItem("Email", formData.email);
//             localStorage.setItem("Password", formData.password);

//             alert("Signup Successful!");
//             navigate("/Accounts/login");
//         }, 1000);
//     };

//     const inputFields = [
//         { label: "Full Name", type: "text", name: "name", validators: ["name"] },
//         { label: "Username", type: "text", name: "username", validators: ["username"] },
//         { label: "Email", type: "email", name: "email", validators: ["email"] },
//         { label: "Password", type: "password", name: "password", validators: ["password"] },
//         { label: "Confirm Password", type: "password", name: "confirmPassword", validators: ["confirmPassword"] },
//         { label: "Phone Number", type: "text", name: "phone", validators: ["phone"] }
//     ];

//     return (
//         <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
//             <div className="p-4 border rounded">
//                 <h1 className="text-center">Sign Up</h1>
//                 {inputFields.map((field) => (
//                     <div key={field.name}>
//                         <Input
//                             label={field.label}
//                             type={field.type}
//                             name={field.name}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             error={error[field.name]}
//                             validators={field.validators}
//                         />
//                     </div>
//                 ))}

//                 <button className="btn btn-primary w-100" onClick={handleSignup} disabled={isSubmitting}>
//                     {isSubmitting ? "Signing up..." : "Sign Up"}
//                 </button>

//                 <p className="text-center mt-3">
//                     Already have an account?{" "}
//                     <span role="button" className="text-primary" onClick={() => navigate("/Accounts/login")} style={{ cursor: "pointer" }}
//                     >
//                         Log in
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Signup;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/input";
import signupImage from "../images/signup.jpg";
const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const divStyle = {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${signupImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
        setError({ ...error, [key]: !isValid });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setError({});

        // Check for errors before submission
        if (Object.values(error).some(err => err)) {
            alert("Please fix the errors before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Sign up Successful!");
                setTimeout(() => navigate("/Accounts/login"), 1000);
            } else {
                setError({ ...error, general: data.message });
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError({ general: "Error signing up. Please try again." });
        }

        setIsSubmitting(false);
    };



    const inputFields = [
        { label: "Full Name", type: "text", name: "firstname", validators: ["firstname"] },
        { label: "Last Name", type: "text", name: "lastname", validators: ["lastname"] },
        { label: "Username", type: "text", name: "username", validators: ["username"] },
        { label: "Email", type: "email", name: "email", validators: ["email"] },
        { label: "Password", type: "password", name: "password", validators: ["password"] },
        { label: "Confirm Password", type: "password", name: "confirmPassword", validators: ["confirmPassword"] },
        { label: "Phone Number", type: "text", name: "phone", validators: ["phone"] },
    ];

    return (
        <div style={divStyle}>
            <div className="p-3 border rounded" style={{ width: "350px", backgroundColor: "white", padding: "20px" }}>
                <h1 className="text-center" >Sign Up</h1>
                {inputFields.map((field) => (
                    <div key={field.name}>
                        <Input
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            error={error[field.name]}
                            validators={field.validators}
                            relatedValue={field.name === "confirmPassword" ? formData.password : ""}
                        />
                    </div>
                ))}

                <button className="btn btn-primary w-100" onClick={handleSignup} disabled={isSubmitting}>
                    Sign Up
                </button>
                {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
                {error.general && <p className="text-danger text-center mt-3">{error.general}</p>}
                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <span
                        role="button"
                        className="text-primary"
                        onClick={() => navigate("/Accounts/login")}
                        style={{ cursor: "pointer" }}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;

