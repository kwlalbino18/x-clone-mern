import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    console.log("Connecting to MONGODB " + ENV.MONGO_URI);
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB SUCCESSFULLY ✅");
  } catch (error) {
    console.log("Error connecting to MONGODB " + ENV.MONGO_URI, error.message);

    process.exit(1);
  }
};