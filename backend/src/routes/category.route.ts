import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.post("/", createCategory);
router.patch("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
