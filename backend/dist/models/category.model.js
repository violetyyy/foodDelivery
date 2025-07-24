"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const categorySchema = new Schema({
    name: { type: String, required: true },
    description: String,
}, { timestamps: true });
exports.Category = model("Category", categorySchema);
//# sourceMappingURL=category.model.js.map