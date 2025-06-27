import jwt from "jsonwebtoken";
import { Request, response, Response } from "express";

const verifyToken = (request: any, res: Response, next: any) => {
  const token = request.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded: any = jwt.verify(token, "Tugsuu1010");
    request.userId = decoded.userId as string;
    next();
  } catch (error) {
    response.status(400).json({ error: error });
  }
};

export default verifyToken;
