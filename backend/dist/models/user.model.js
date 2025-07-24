"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const user = new Schema({
    email: { type: String, required: true },
    password: String,
    phoneNumber: String,
    address: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: Boolean,
    createdAt: Date,
    updatedAt: Date,
});
exports.User = model("User", user);
//# sourceMappingURL=user.model.js.map