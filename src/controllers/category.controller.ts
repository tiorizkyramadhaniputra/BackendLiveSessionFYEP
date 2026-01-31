import { Request, Response } from "express";
import Category from "../models/category.model";

/**
 * CREATE CATEGORY
 */
export const createCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error creating Category",
      error,
    });
  }
};

/**
 * GET ALL CATEGORIES
 */
export const getCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error,
    });
  }
};

/**
 * GET CATEGORY BY ID
 */
export const getCategoryById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category",
      error,
    });
  }
};

/**
 * UPDATE CATEGORY
 */
export const updateCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updateData: any = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
      error,
    });
  }
};

/**
 * DELETE CATEGORY
 */
export const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting category",
      error,
    });
  }
};
