"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = await bcrypt_1.default.hash(password, 10);
        const createdUser = await user_model_1.User.create({
            email,
            password: hash,
        });
        res.status(201).json({
            success: true,
            data: createdUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.User.findOne({ email });
        if (!user || !user.password) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (isMatch) {
            res.status(200).json({ success: true, message: "Authenticated" });
        }
        else {
            res.status(401).json({ success: false, message: "Wrong password" });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.signIn = signIn;
//# sourceMappingURL=user.controller.js.map