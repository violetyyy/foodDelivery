import { FoodCategory } from "../models/food.category.model.js";
export const getAllFoodCategories = async (_req, res, next) => {
    try {
        const foodCategories = await FoodCategory.find();
        res.status(200).json({ success: true, data: foodCategories });
    }
    catch (err) {
        next(err);
    }
};
export const createFoodCategory = async (req, res, next) => {
    try {
        const foodCategory = await FoodCategory.create(req.body);
        res.status(201).json({ success: true, data: foodCategory });
    }
    catch (err) {
        next(err);
    }
};
export const updateFoodCategory = async (req, res, next) => {
    try {
        const foodCategory = await FoodCategory.findByIdAndUpdate(req.params.foodCategoryId, req.body, { new: true });
        res.status(200).json({ success: true, data: foodCategory });
    }
    catch (err) {
        next(err);
    }
};
export const deleteFoodCategory = async (req, res, next) => {
    try {
        await FoodCategory.findByIdAndDelete(req.params.foodCategoryId);
        res.status(200).json({
            success: true,
            message: "Food category deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
