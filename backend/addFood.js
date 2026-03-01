import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Food items
const foodItems = [
  {
    name: "Fresh Salad Bowl",
    description: "Healthy salad with veggies & dressing",
    price: 120,
    category: "Salad",
    image: "salad.jpg",
  },
  {
    name: "Caesar Salad",
    description: "Romaine lettuce with croutons",
    price: 150,
    category: "Salad",
    image: "salad2.jpg",
  },
  {
    name: "Veg Spring Rolls",
    description: "Crispy rolls filled with veggies",
    price: 90,
    category: "Rolls",
    image: "rolls.jpg",
  },
  {
    name: "Paneer Rolls",
    description: "Spicy paneer stuffed rolls",
    price: 110,
    category: "Rolls",
    image: "rolls2.jpg",
  },
  {
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie",
    price: 80,
    category: "Deserts",
    image: "brownie.jpg",
  },
  {
    name: "Gulab Jamun",
    description: "Sweet Indian dessert",
    price: 60,
    category: "Deserts",
    image: "gulabjamun.jpg",
  },
  {
    name: "Veg Sandwich",
    description: "Toasted sandwich with fresh veggies",
    price: 100,
    category: "Sandwich",
    image: "sandwich.jpg",
  },
  {
    name: "Cheese Sandwich",
    description: "Loaded cheese sandwich",
    price: 130,
    category: "Sandwich",
    image: "sandwich2.jpg",
  },
  {
    name: "Rainbow Cake Slice",
    description: "Soft layered cake",
    price: 90,
    category: "Cake",
    image: "cake.jpg",
  },
  {
    name: "Chocolate Truffle Cake",
    description: "Rich dark chocolate cake",
    price: 150,
    category: "Cake",
    image: "cake2.jpg",
  },
  {
    name: "Veg Thali",
    description: "Complete Indian veg meal",
    price: 180,
    category: "Pure Veg",
    image: "vegthali.jpg",
  },
  {
    name: "Paneer Curry",
    description: "Soft paneer cubes in gravy",
    price: 160,
    category: "Pure Veg",
    image: "paneer.jpg",
  },
  {
    name: "White Sauce Pasta",
    description: "Creamy alfredo pasta",
    price: 210,
    category: "Pasta",
    image: "pasta.jpg",
  },
  {
    name: "Red Sauce Pasta",
    description: "Spicy Arrabiata pasta",
    price: 200,
    category: "Pasta",
    image: "pasta2.jpg",
  },
  {
    name: "Veg Hakka Noodles",
    description: "Stir-fried noodles with veggies",
    price: 140,
    category: "Noodles",
    image: "noodles.jpg",
  },
  {
    name: "Schezwan Noodles",
    description: "Spicy Chinese noodles",
    price: 160,
    category: "Noodles",
    image: "noodles2.jpg",
  }
];

// Insert data
async function insertData() {
  try {
    await foodModel.insertMany(foodItems);
    console.log("Food items added successfully!");
  } catch (error) {
    console.error("Error inserting items:", error);
  }
  mongoose.disconnect();
}

insertData();