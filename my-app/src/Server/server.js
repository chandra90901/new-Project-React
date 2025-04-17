const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5001;
const SECRET_KEY = "your_secret_key";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "Chandra",
    password: "Chandu90901@",
    database: "Supermarket",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

//  Signup Endpoint - Insert User with Hashed Password
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

// app.get("/api/singup", (req, res) => {
//     db.query("SELECT username FROM singup", (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: "Error fetching singup" });
//         }
//         res.json(results);

//     });
// });
// Login Endpoint - Generate JWT Token
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
            { expiresIn: "60s" }
        );

        // Send Token with User Details (Exclude Password)
        const { id, firstname, lastname, username, phone } = user;
        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: { id, firstname, lastname, username, phone, email }
        });
    });
});

// JWT Middleware to Protect Routes
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).json({ message: "No token provided" });
    }

    const token = bearerHeader.split(" ")[1]; // Extract token after "Bearer"
    if (!token) {
        return res.status(403).json({ message: "Token format invalid" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT error:", err.message);
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
})

app.post("/api/role", (req, res) => {
    const { roleName } = req.body;

    if (!roleName) {
        return res.status(400).json({ message: "Role name is required" });
    }

    const sql = "INSERT INTO role (roleName ) VALUES (?)";
    db.query(sql, [roleName], (err, result) => {
        if (err) {
            console.error("Error inserting role:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(201).json({ message: "Role added", id: result.insertId });
    });
});

app.get("/api/role", (req, res) => {
    db.query("SELECT * FROM role", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching role" });
        }
        res.json(results);
    });
});

// Delete Single Role
app.delete("/api/role/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM role WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Role not found" });

        res.status(200).json({ message: "Role deleted" });
    });
});

// Bulk Delete Roles
app.post("/api/role/delete", (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "No roles selected for deletion" });
    }

    const deleteSql = `DELETE FROM role WHERE id IN (${ids.map(() => "?").join(",")})`;
    db.query(deleteSql, ids, (err, result) => {
        if (err) return res.status(500).json({ message: "Error deleting roles" });
        res.json({ message: "Roles deleted successfully" });
    });
});

//Department Mysql coonection.....................................................................................

app.post("/api/department", (req, res) => {
    const { departmentName } = req.body;

    if (!departmentName) {
        return res.status(400).json({ message: "department name is required" });
    }

    const sql = "INSERT INTO department (departmentName ) VALUES (?)";
    db.query(sql, [departmentName], (err, result) => {
        if (err) {
            console.error("Error inserting department:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(201).json({ message: "department added", id: result.insertId });
    });
});

app.get("/api/department", (req, res) => {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching department" });
        }
        res.json(results);
    });
});

// Delete Single department
app.delete("/api/department/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM department WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "department not found" });

        res.status(200).json({ message: "department deleted" });
    });
});

// Bulk Delete departments
app.post("/api/department/delete", (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "No department selected for deletion" });
    }

    const deleteSql = `DELETE FROM department WHERE id IN (${ids.map(() => "?").join(",")})`;
    db.query(deleteSql, ids, (err, result) => {
        if (err) return res.status(500).json({ message: "Error deleting department" });
        res.json({ message: "department deleted successfully" });
    });
});

// // RoleAssigning.................................................................................
// Get Role Assignments from signup table
app.get("/api/role-assign", (req, res) => {
    const sql = `
    SELECT
      signup.id,
      signup.username,
      signup.email,
      role.roleName,
      department.departmentName AS department
    FROM signup
    LEFT JOIN role ON signup.roleName = role.roleName
    LEFT JOIN department ON signup.department = department.departmentName
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching role assignments:", err);
            return res.status(500).json({ error: "Failed to fetch role assignments" });
        }
        res.status(200).json(results);
    });
});

// Update Role and Department in signup table

app.put("/api/role-assign/:id", (req, res) => {
    console.log("PUT /api/role-assign/:id hit");
    const { roleName, department } = req.body;
    const employeeId = req.params.id;
    console.log("Received PUT for ID:", req.params.id);
    console.log("Role:", roleName, "Department:", department);
    if (!roleName || !department) {
        return res.status(400).json({ message: "Role and Department are required" });
    }

    const sql = "UPDATE signup SET roleName = ?, department = ? WHERE id = ?";
    db.query(sql, [roleName, department, employeeId], (err, result) => {
        if (err) {
            console.error("Error updating:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Role assigned successfully" });
    });
});


// PUT /api/updateUser
app.put('/api/updateUser/:id', async (req, res) => {
    const { username, email } = req.body;
    const userId = req.params.id;

    try {
        await db.promise().query(
            "UPDATE signup SET username = ?, email = ? WHERE id = ?",
            [username, email, userId]
        );

        const [rows] = await db.promise().query("SELECT * FROM signup WHERE id = ?", [userId]);

        res.json({ message: "User updated successfully", updatedUser: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});