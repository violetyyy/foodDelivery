import { Router } from "express";
import {
  createFoodCategory,
  deleteFoodCategory,
  getAllFoodCategories,
  updateFoodCategory,
} from "../controllers/foodCategory.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const foodCategoryRouter = Router();

foodCategoryRouter.get("/", getAllFoodCategories);
foodCategoryRouter.post("/", authMiddleware, createFoodCategory);
foodCategoryRouter.put("/:foodCategoryId", authMiddleware, updateFoodCategory);
foodCategoryRouter.delete(
  "/:foodCategoryId",
  authMiddleware,
  deleteFoodCategory
);
