import mongoose from "mongoose";
import config from "../config/config";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbURI, {});
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error", err);
    process.exit(1);
  }
};
