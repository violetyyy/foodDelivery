import { Food } from "../models/food.model.js";
export const getAllFoods = async (_req, res, next) => {
    try {
        const foods = await Food.find().populate("category");
        res.status(201).json({ success: true, data: foods });
    }
    catch (err) {
        next(err);
    }
};
export const getFoodById = async (req, res, next) => {
    try {
        const food = await Food.findById(req.params.foodId);
        res.json({ success: true, data: food });
    }
    catch (err) {
        next(err);
    }
};
export const createFood = async (req, res, next) => {
    try {
        const food = await Food.create(req.body);
        res.status(201).json({ success: true, data: food });
    }
    catch (err) {
        next(err);
    }
};
export const updateFood = async (req, res, next) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.foodId, req.body, {
            new: true,
        });
        res.json({ success: true, data: food });
    }
    catch (err) {
        next(err);
    }
};
export const deleteFood = async (req, res, next) => {
    try {
        await Food.findByIdAndDelete(req.params.foodId);
        res.status(200).json({
            success: true,
            message: "Food deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
