import { FoodOrder } from "../models/food-order.model.js";
export const getAllFoodOrders = async (_req, res, next) => {
    try {
        const foodOrders = await FoodOrder.find()
            .populate("user")
            .populate("foodOrderItems.food");
        res.status(200).json({ success: true, data: foodOrders });
    }
    catch (err) {
        next(err);
    }
};
export const getFoodOrderByUserId = async (req, res, next) => {
    try {
        const foodOrders = await FoodOrder.find({
            user: req.params.userId,
        })
            .populate("user")
            .populate("foodOrderItems.food");
        res.status(200).json({ success: true, data: foodOrders });
    }
    catch (err) {
        next(err);
    }
};
export const createFoodOrder = async (req, res, next) => {
    try {
        const foodOrder = await FoodOrder.create(req.body);
        res.status(201).json({ success: true, data: foodOrder });
    }
    catch (err) {
        next(err);
    }
};
export const updateFoodOrder = async (req, res, next) => {
    try {
        const foodOrder = await FoodOrder.findByIdAndUpdate(req.params.foodOrderId, req.body, { new: true });
        res.status(200).json({ success: true, data: foodOrder });
    }
    catch (err) {
        next(err);
    }
};
export const deleteFoodOrder = async (req, res, next) => {
    try {
        await FoodOrder.findByIdAndDelete(req.params.foodOrderId);
        res.status(200).json({
            success: true,
            message: "Food order deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
