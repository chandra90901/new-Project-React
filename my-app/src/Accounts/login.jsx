// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userNameValidation, emailValidation, passwordValidation } from "../Components/validation";
// import Input from "../Components/input";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         setError({ ...error, [e.target.name]: "" });
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setIsSubmitting(true);
//         // setTimeout(() => {
//         const storedEmail = localStorage.getItem("Email");
//         const storedPassword = localStorage.getItem("Password");

//         if (formData.email === storedEmail && formData.password === storedPassword) {
//             alert("Login Successful!");
//             navigate("/");
//         } else {
//             setError({ email: "Invalid credentials.", password: "Invalid credentials." });
//         }

//         setIsSubmitting(false);
//         // }, 1000);
//     }

//     const inputFields = [
//         // { label: "Username", type: "text", name: "username" },
//         { label: "Email", type: "email", name: "email" },
//         { label: "Password", type: "password", name: "password" }
//     ];

//     return (
//         <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
//             <div className="p-4 border rounded">
//                 <h1 className="text-center">Login</h1>
//                 <form onSubmit={handleLogin}>
//                     {inputFields.map((field) => (
//                         <div key={field.name}>
//                             <Input
//                                 label={field.label}
//                                 type={field.type}
//                                 name={field.name}
//                                 value={formData[field.name]}
//                                 onChange={handleChange}
//                                 error={error[field.name]}
//                             />
//                             {/* {error[field.name] && <p className="text-danger">{error[field.name]}</p>} */}
//                         </div>
//                     ))}
//                     <button className="btn btn-primary w-100 mt-2" type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? "Logging in..." : "Log in"}
//                     </button>
//                 </form>
//                 <p className="text-center mt-3">
//                     Need an account?{" "}
//                     <span role="button" className="text-primary" onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}>
//                         Sign Up
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Input from "../Components/input";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (value, isValid, key) => {
//         setFormData({ ...formData, [key]: value });
//         setError({ ...error, [key]: isValid ? "" : error[key] });
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const hasErrors = Object.values(error).some(err => err);
//         if (hasErrors) {
//             alert("Please fix the errors before submitting.");
//             return;
//         }

//         setIsSubmitting(true);
//         setTimeout(() => {
//             const storedEmail = localStorage.getItem("Email") || "";
//             const storedPassword = localStorage.getItem("Password") || "";

//             console.log("Stored Email:", storedEmail);
//             console.log("Stored Password:", storedPassword);
//             console.log("Entered Email:", formData.email);
//             console.log("Entered Password:", formData.password);

//             if (formData.email.toLowerCase().trim() === storedEmail && formData.password === storedPassword) {
//                 // alert("Login Successful!");
//                 navigate("/");
//             } else {
//                 setError({
//                     email: "Invalid credentials.",
//                     password: "Invalid credentials.",
//                 });
//             }

//             setIsSubmitting(false);
//         }, 1000);
//     };
//     const inputFields = [
//         { label: "Email", type: "email", name: "email", validators: ["email"] },
//         { label: "Password", type: "password", name: "password", validators: ["password"] },
//     ];
//     return (
//         <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
//             <div className="p-4 border rounded">
//                 <h1 className="text-center">Login</h1>
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
//                         {/* {error[field.name] && <p className="text-danger">{error[field.name]}</p>} */}
//                     </div>
//                 ))}
//                 <button className="btn btn-primary w-100 mt-2" onClick={handleLogin} disabled={isSubmitting}>
//                     {isSubmitting ? "Logging in..." : "Log in"}
//                 </button>
//                 <p className="text-center mt-3">
//                     Need an account?{" "}
//                     <span role="button" className="text-primary" onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}>
//                         Sign Up
//                     </span>
//                 </p>
//             </div>
//         </div >
//     );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/input";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (value, isValid, key) => {
        setFormData({ ...formData, [key]: value });
        setError({ ...error, [key]: isValid ? "" : "Invalid input" });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // if (Object.values(error).some((err) => err)) {
        //     alert("Please fix the errors before submitting.");
        //     return;
        // }

        // setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),

            });
            console.log("Signup Request Data:", formData);
            const data = await response.json();

            if (response.ok) {
                alert("Login Successful!");
                // localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", formData.email);
                navigate("/");
            } else {
                alert(data.message || "Invalid login credentials");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Error logging in. Please try again.");
        }

        setIsSubmitting(false);
    };


    const inputFields = [
        { label: "Email", type: "email", name: "email", validators: ["email"] },
        { label: "Password", type: "password", name: "password", validators: ["password"] },
    ];

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <div className="p-4 border rounded">
                <h1 className="text-center">Login</h1>
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
                        />
                    </div>
                ))}
                <button className="btn btn-primary w-100 mt-2" onClick={handleLogin} disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log in"}
                </button>
                <p className="text-center mt-3">
                    Need an account?{" "}
                    <span role="button" className="text-primary" onClick={() => navigate("/Accounts/signup")} style={{ cursor: "pointer" }}>
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
