import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/functions/jwt.js";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Access token required" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token required" });
  }
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded as { userId: string; email: string };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid access token" });
  }
};
