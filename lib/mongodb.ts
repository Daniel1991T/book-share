import mongoose from "mongoose";

let isConnected: boolean = false;
const DB_NAME = "book-share";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Missing MongoDB URL!");
  }
  if (isConnected) {
    return console.log("MongoDB is already connected!");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,
    });
    isConnected = true;
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};
