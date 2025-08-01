import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGODB_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("DB connected successfully");
  } catch (e) {
    console.log("DB connection failed", e);
    process.exit(1);
  }
};

export default dbConnect;
