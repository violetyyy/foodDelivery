import { Request, Response } from "express";

export const errorHandler = (err: any, _req: Request, res: Response) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || undefined,
  });
};
