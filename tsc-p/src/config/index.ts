import mongoose from "mongoose";
import { EnvVars } from "./serverConfig";  

const DB_URL = EnvVars.DB_URL || "";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DB_URL);

    if (connection) {
      console.log(`MongoDB connected successfully at: ${connection.connection.host}`);
    }
  } catch (error:any) {
    console.error(`Error connecting to the database: ${error.message}`);
    // Optionally exit the process in case of failure
    process.exit(1);
  }
};

export default connectDB;
