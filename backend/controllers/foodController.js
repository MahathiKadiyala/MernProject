import fs from "fs";
import foodModel from "../models/foodModel.js";

// ✅ Add food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, price, and category are required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image not uploaded" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name,
      description: description || "",
      price,
      category,
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food Added", data: food });

  } catch (error) {
    console.log("Add Food Error:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// ✅ List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.log("List Food Error:", error);
    res.status(500).json({ success: false, message: "Error fetching food" });
  }
};

// ✅ Remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image file if exists
    if (food.image) {
      try {
        await fs.promises.unlink(`uploads/${food.image}`);
      } catch (err) {
        console.log("Image delete error:", err);
      }
    }

    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food Removed" });

  } catch (error) {
    console.log("Remove Food Error:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };