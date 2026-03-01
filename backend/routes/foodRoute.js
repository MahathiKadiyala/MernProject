import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();

// ✅ Multer storage setup for image uploads
const storage = multer.diskStorage({
  destination: "uploads", // folder where images are stored
  filename: (req, file, cb) => {
    // prepend timestamp to filename to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ✅ Routes

// Public route: List all food items
foodRouter.get("/list", listFood);

// Protected route: Add new food with image upload
foodRouter.post("/add", authMiddleware, upload.single("image"), addFood);

// Protected route: Remove a food item
foodRouter.post("/remove", authMiddleware, removeFood);

export default foodRouter;