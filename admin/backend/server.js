const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Pre-hash the admin password once
const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Admin Login API
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  // Check email
  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ success: false, message: "Invalid email" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }

  // Generate JWT Token
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
  });
});

// Protected Route Example
app.get("/api/admin/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Welcome to the admin dashboard", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
