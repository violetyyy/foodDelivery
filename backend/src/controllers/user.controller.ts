import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      password: hash,
    });

    res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).json({ success: true, message: "Authenticated" });
    } else {
      res.status(401).json({ success: false, message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
