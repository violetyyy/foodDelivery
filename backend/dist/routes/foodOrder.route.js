"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foodOrder_controller_1 = require("../controllers/foodOrder.controller");
const router = (0, express_1.Router)();
router.get("/", foodOrder_controller_1.getAllOrders);
router.post("/", foodOrder_controller_1.createOrder);
router.get("/user/:userId", foodOrder_controller_1.getOrdersByUser);
router.patch("/:orderId", foodOrder_controller_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=foodOrder.route.js.map