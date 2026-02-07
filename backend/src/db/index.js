import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log("DB Connected!");
  } catch (err) {
    res.status(401).send("Error DB Connection!");
  }
};

export { connectDB };
