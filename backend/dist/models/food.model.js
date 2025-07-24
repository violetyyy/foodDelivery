"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const foodSchema = new Schema({
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: { type: String },
    category: { type: String },
}, {
    timestamps: true,
});
exports.Food = model("Food", foodSchema);
//# sourceMappingURL=food.model.js.map