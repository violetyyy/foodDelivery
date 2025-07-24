"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const category_model_1 = require("../models/category.model");
const getAllCategories = async (_req, res) => {
    try {
        const categories = await category_model_1.Category.find();
        res.json({ success: true, data: categories });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.getAllCategories = getAllCategories;
const createCategory = async (req, res) => {
    try {
        const category = await category_model_1.Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const category = await category_model_1.Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true });
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const category = await category_model_1.Category.findByIdAndDelete(req.params.categoryId);
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map