import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
