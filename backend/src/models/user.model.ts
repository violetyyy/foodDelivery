import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = model("User", userSchema);
