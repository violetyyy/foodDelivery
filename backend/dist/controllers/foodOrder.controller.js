"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrdersByUser = exports.createOrder = exports.getAllOrders = void 0;
const foodOrder_model_1 = require("../models/foodOrder.model");
const food_model_1 = require("../models/food.model");
const getAllOrders = async (_req, res) => {
    try {
        const orders = await foodOrder_model_1.FoodOrder.find()
            .populate("user")
            .populate("foodOrderItems.food");
        res.json({ success: true, data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.getAllOrders = getAllOrders;
const createOrder = async (req, res) => {
    const { user, foodOrderItems } = req.body;
    try {
        let totalPrice = 0;
        for (const item of foodOrderItems) {
            const food = await food_model_1.Food.findById(item.food);
            if (food) {
                totalPrice += food.price * item.quantity;
            }
        }
        const order = await foodOrder_model_1.FoodOrder.create({
            user,
            foodOrderItems,
            totalPrice,
        });
        res.status(201).json({ success: true, data: order });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.createOrder = createOrder;
const getOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await foodOrder_model_1.FoodOrder.find({ user: userId }).populate("foodOrderItems.food");
        res.json({ success: true, data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.getOrdersByUser = getOrdersByUser;
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
        const order = await foodOrder_model_1.FoodOrder.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json({ success: true, data: order });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=foodOrder.controller.js.map