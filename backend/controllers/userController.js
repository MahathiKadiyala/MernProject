import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Normal User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // Normal users get role: "user" (ensure your model has a role field)
    const newUser = await User.create({ name, email, password: hashedPassword, role: "user" });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// NEW: Register Admin (Use this in Postman)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // Explicitly set role to admin
    const newUser = await User.create({ name, email, password: hashedPassword, role: "admin" });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login (Updated to check for Admin Role)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // We check if the request is coming from the Admin Panel or User Panel
    // (You can pass a 'fromAdmin' flag from the frontend or just check the role later)
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // --- THE FIX IS HERE ---
    // Return the role so the Frontend can decide what to do
    res.json({ 
        success: true, 
        token, 
        role: user.role, // Send the role to the frontend
        name: user.name 
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};