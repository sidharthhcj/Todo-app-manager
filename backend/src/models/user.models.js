import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, required: true },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function (_id) {
  const token = jwt.sign({ id: _id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  return token;
};

const User = mongoose.model("User", userSchema);
export { User };
