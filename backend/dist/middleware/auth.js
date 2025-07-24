"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const verifyToken = (request, res, next) => {
    const token = request.header("Authorization");
    if (!token)
        return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "Tugsuu1010");
        request.userId = decoded.userId;
        next();
    }
    catch (error) {
        express_1.response.status(400).json({ error: error });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=auth.js.map