import mongoose from "mongoose";

const { Schema, model } = mongoose;

const foodSchema = new Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Food = model("Food", foodSchema);
