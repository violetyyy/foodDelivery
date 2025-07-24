"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const food_controller_1 = require("../controllers/food.controller");
const foodsRouter = express_1.default.Router();
foodsRouter.get("/", food_controller_1.getAllFoods);
foodsRouter.post("/", food_controller_1.createFood);
foodsRouter.patch("/:foodId", food_controller_1.updateFood);
foodsRouter.delete("/:foodId", food_controller_1.deleteFood);
foodsRouter.get("/:foodId", food_controller_1.getFoodByid);
exports.default = foodsRouter;
//# sourceMappingURL=food.route.js.map