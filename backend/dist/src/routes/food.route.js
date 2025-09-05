import { Router } from "express";
import { createFood, deleteFood, updateFood, getFoodById, getAllFoods, } from "../controllers/food.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const foodRouter = Router();
foodRouter.get("/", getAllFoods);
foodRouter.get("/:foodId", getFoodById);
foodRouter.post("/", authMiddleware, createFood);
foodRouter.put("/:foodId", authMiddleware, updateFood);
foodRouter.delete("/:foodId", authMiddleware, deleteFood);
