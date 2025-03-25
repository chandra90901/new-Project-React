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




require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "Chandra", // Your MySQL username
    password: "Chandu90901@", // Your MySQL password
    database: "Supermarket", // Your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

// ✅ Register API - Hash Password & Store in Database
app.post("/signup", async (req, res) => {
    const { firstname, lastname, username, phone, email, password } = req.body;

    if (!firstname || !lastname || !username || !phone || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = "INSERT INTO signup (firstname, lastname, username, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [firstname, lastname, username, phone, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.json({ success: true, message: "User registered successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error encrypting password", error });
    }
});

// ✅ login API - Compare Encrypted Password & Generate JWT Token
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    const sql = "SELECT * FROM signup WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" });

            res.json({ success: true, message: "Login successful", token });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    });
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
