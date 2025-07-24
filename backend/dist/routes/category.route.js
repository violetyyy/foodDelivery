"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.getAllCategories);
router.post("/", category_controller_1.createCategory);
router.patch("/:categoryId", category_controller_1.updateCategory);
router.delete("/:categoryId", category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.route.js.map