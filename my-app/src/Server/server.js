// require("dotenv").config();
// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const bcrypt = require("bcrypt");


// const app = express();
// app.use(cors());
// app.use(bodyParser.json()); // Middleware to parse JSON

// // MySQL Connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "Chandra", // Your MySQL username
//     password: "Chandu90901@", // Your MySQL password
//     database: "Supermarket", // Your database name
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//     } else {
//         console.log("Connected to MySQL database");
//     }
// });


// // ✅ Register API - Hash Password
// app.post("/signup", async (req, res) => {
//     console.log("Received Data:", req.body);  // Debugging line
//     const { firstname, lastname, username, phone, email, password } = req.body;
//     if (!firstname || !lastname || !username || !phone || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const sql = "INSERT INTO signup (firstname, lastname, username, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)";
//         db.query(sql, [firstname, lastname, username, phone, email, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error("Database Error:", err);
//                 return res.status(500).json({ message: "Database error", error: err });
//             }
//             res.json({ success: true, message: "User registered successfully" });
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error encrypting password", error });
//     }
// });

// // ✅ Login API - Compare Encrypted Password
// app.post("/users", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and Password are required" });
//     }

//     const sql = "SELECT * FROM users WHERE email = ?";
//     db.query(sql, [email], async (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: "Database error", error: err });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ success: false, message: "Invalid email or password" });
//         }

//         const user = results[0];

//         // Compare the entered password with the stored hashed password
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {
//             res.json({ success: true, message: "Login successful", user: { id: user.id, email: user.email } });
//         } else {
//             res.status(401).json({ success: false, message: "Invalid email or password" });
//         }
//     });
// });

// // ✅ Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Replace with a strong secret

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "Chandra", // Your MySQL username
    password: "Chandu90901@", // Your MySQL password
    database: "Supermarket", // Your database name
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("✅ Connected to the MySQL database.");
});

// ✅ Signup Endpoint - Insert User with Hashed Password
app.post("/api/signup", async (req, res) => {
    const { firstname, lastname, username, phone, email, password } = req.body;

    if (!firstname || !lastname || !username || !phone || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const checkUserSql = "SELECT * FROM signup WHERE email = ? OR username = ?";
        db.query(checkUserSql, [email, username], async (err, results) => {
            if (err) return res.status(500).json({ error: "Error checking user" });
            if (results.length > 0) return res.status(400).json({ message: "User already exists" });

            // Hash the password and insert user
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = "INSERT INTO signup (firstname, lastname, username, phone, email, password) VALUES (?, ?, ?, ?,?, ?)";
            const values = [firstname, lastname, username, phone, email, hashedPassword];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error inserting data:", err);
                    return res.status(500).send(err);
                }
                res.status(200).json({ message: "Signup successful!" });
            });
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Login Endpoint - Generate JWT Token
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // console.log(password);

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "SELECT * FROM signup WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or email" });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: "10s" }  // 5 seconds expiration time
        );

        // Send Token with User Details (Exclude Password)
        const { id, firstname, lastname, username, phone } = user;
        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,  // Send token to frontend
            user: { id, firstname, lastname, username, phone, email }
        });
    });
});

// JWT Middleware to Protect Routes
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("✅ Token Verified:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
// Protected Route Example: Fetch User Details
app.get("/api/signup", verifyToken, (req, res) => {
    const userId = req.user.id; // Get user ID from token

    const sql = "SELECT id, firstname, lastname, username, phone, email, password FROM signup WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(results[0]);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});