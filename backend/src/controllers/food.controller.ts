import { Food } from "../models/food.model.js";
import { ExpressHandler } from "../utils/types/expressHandler.js";

export const getAllFoods: ExpressHandler = async (_req, res, next) => {
  try {
    const foods = await Food.find().populate("category");
    res.status(201).json({ success: true, data: foods });
  } catch (err) {
    next(err);
  }
};

export const getFoodById: ExpressHandler = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.foodId);
    res.json({ success: true, data: food });
  } catch (err) {
    next(err);
  }
};

export const createFood: ExpressHandler = async (req, res, next) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json({ success: true, data: food });
  } catch (err) {
    next(err);
  }
};

export const updateFood: ExpressHandler = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.foodId, req.body, {
      new: true,
    });
    res.json({ success: true, data: food });
  } catch (err) {
    next(err);
  }
};

export const deleteFood: ExpressHandler = async (req, res, next) => {
  try {
    await Food.findByIdAndDelete(req.params.foodId);
    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
