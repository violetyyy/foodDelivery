import { Router } from "express";
import { createFoodOrder, deleteFoodOrder, getAllFoodOrders, getFoodOrderByUserId, updateFoodOrder, } from "../controllers/foodOrder.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const foodOrderRouter = Router();
foodOrderRouter.get("/", authMiddleware, getAllFoodOrders);
foodOrderRouter.get("/:userId", authMiddleware, getFoodOrderByUserId);
foodOrderRouter.post("/", authMiddleware, createFoodOrder);
foodOrderRouter.put("/:foodOrderId", authMiddleware, updateFoodOrder);
foodOrderRouter.delete("/:foodOrderId", authMiddleware, deleteFoodOrder);
