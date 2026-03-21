import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ADDED: role field to distinguish between Admin and User
    role: { type: String, default: "user" }, 
    cartData: { type: Object, default: {} }
}, { minimize: false });

// Using || to avoid re-compiling the model if it already exists
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;