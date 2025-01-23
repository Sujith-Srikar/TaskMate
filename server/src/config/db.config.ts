import mongoose from "mongoose";

require("dotenv").config();

const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/";
export default async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
  }
};