import mongoose from "mongoose";
import { FoodOrderStatusEnum } from "../enums/foodOrderStatus.enum.js";
const { Schema, model } = mongoose;
const foodOrderItemSchema = new Schema({
    food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true },
});
const foodOrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: [foodOrderItemSchema],
    status: {
        type: String,
        enum: Object.values(FoodOrderStatusEnum),
        default: FoodOrderStatusEnum.PENDING,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const FoodOrder = model("FoodOrder", foodOrderSchema);
