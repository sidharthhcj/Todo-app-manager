import mongoose from "mongoose";
import { User } from "./user.models.js";

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "incomplete",
      enum: ["completed", "incomplete"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
