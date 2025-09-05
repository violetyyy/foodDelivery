import mongoose from "mongoose";
const { Schema, model } = mongoose;
const foodSchema = new Schema({
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    category: {
        type: Schema.Types.ObjectId,
        ref: "FoodCategory",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Food = model("Food", foodSchema);
