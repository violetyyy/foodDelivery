import { User } from "../models/user.model.js";
import { ExpressHandler } from "../utils/types/expressHandler.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/functions/hash.js";
import { generateAccessToken } from "../utils/functions/jwt.js";

export const signUp: ExpressHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const newUser = await User.create({
      ...req.body,
      password: await hashPassword(password),
      role: "user",
      isVerified: false,
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    next(err);
  }
};

export const signIn: ExpressHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      email: user.email,
    });

    res.status(200).json({ success: true, data: { accessToken } });
  } catch (err) {
    next(err);
  }
};
