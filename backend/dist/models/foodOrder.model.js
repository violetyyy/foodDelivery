"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, Types } = mongoose_1.default;
const foodOrder = new Schema({
    user: { type: Types.ObjectId, ref: "User" },
    totalPrice: Number,
    foodOrderItems: [String],
    status: {
        type: String,
        enum: ["PENDING", "DELIVERED", "CANCELED"],
        default: "PENDING",
    },
    createdAt: Date,
    updatedAt: Date,
});
exports.FoodOrder = model("FoodOrder", foodOrder);
//# sourceMappingURL=foodOrder.model.js.map