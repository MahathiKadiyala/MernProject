import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Set a timeout so it doesn't hang forever
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Failed: ${error.message}`);
        // Check if it's a whitelist issue
        if (error.message.includes('DSAL')) {
            console.log("👉 Tip: Check your MongoDB Atlas Network Access/IP Whitelist!");
        }
        process.exit(1);
    }
};