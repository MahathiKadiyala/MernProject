import Admin from "../models/adminModel.js"; // Make sure you have an Admin model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Admin login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin in DB
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Sign token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,  // Must match your .env
      { expiresIn: "1d" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin registration (optional)
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};