import { Request, Response } from "express";
import { Category } from "../models/category.model.js";

export const getAllCategories = async (
  request: Request,
  response: Response
) => {
  try {
    const category = await Category.find();
    response.json({ success: true, data: category });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateCategory = async (request: Request, response: Response) => {
  try {
    const updatedCategory = request.body;
    const { foodCategoryId } = request.params;
    const category = await Category.findByIdAndUpdate(
      foodCategoryId,
      updatedCategory,
      {
        new: true,
      }
    );

    response.json({ success: true, data: category });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
