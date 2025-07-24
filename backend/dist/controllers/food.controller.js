"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFoodByid = exports.getAllFoods = void 0;
const food_model_1 = require("../models/food.model");
const getAllFoods = async (request, response) => {
    try {
        const foods = await food_model_1.Food.find();
        response.json({
            success: true,
            data: foods,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
exports.getAllFoods = getAllFoods;
const getFoodByid = (request, response) => {
    response.send("food/:foodId Get huselt irlee");
};
exports.getFoodByid = getFoodByid;
const createFood = async (request, response) => {
    try {
        const food = request.body;
        const createdFood = await food_model_1.Food.create(food);
        response.json({
            success: true,
            data: createdFood,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
exports.createFood = createFood;
const updateFood = async (request, response) => {
    try {
        const { foodId } = request.params;
        const updatedFood = request.body;
        const food = await food_model_1.Food.findByIdAndUpdate(foodId, updatedFood, {
            new: true,
        });
        response.json({
            success: true,
            data: food,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
exports.updateFood = updateFood;
const deleteFood = (request, response) => {
    response.send("food/:foodId Delete huselt irlee");
};
exports.deleteFood = deleteFood;
//# sourceMappingURL=food.controller.js.map