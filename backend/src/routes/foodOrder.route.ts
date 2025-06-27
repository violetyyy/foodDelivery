import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
} from "../controllers/foodOrder.controller.js";

const router = Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUser);
router.patch("/:orderId", updateOrderStatus);

export default router;
