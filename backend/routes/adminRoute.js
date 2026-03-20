import express from "express";
import { loginUser, registerAdmin } from "../controllers/userController.js";

const adminRouter = express.Router();

// Route for Admin Login
// URL: http://localhost:4000/api/admin/login
adminRouter.post("/login", loginUser);

// Route for Admin Registration (Use this in Postman/Thunder Client first)
// URL: http://localhost:4000/api/admin/register
adminRouter.post("/register", registerAdmin);

export default adminRouter;