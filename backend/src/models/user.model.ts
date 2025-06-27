import mongoose from "mongoose";

const { Schema, model } = mongoose;

const user = new Schema({
  email: { type: String, required: true },
  password: String,
  phoneNumber: String,
  address: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", user);
