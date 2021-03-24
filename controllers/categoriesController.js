// Import Categories Model
import { Categories } from "./../models/Model.js";

import CATEGORIES_MODEL from "../utilities/categories-data.js";

// Get All Categories
export const getCategories = async (req, res) => {
  const categories = await Categories.find();
  res.json({ categories });
};

// Get Categories By Title
export const getCategoriesByTitle = async (req, res) => {
  try {
    const categories = await CATEGORIES_MODEL.getCategoryByTitle(req.query.query);

    res.json({ categories });
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};

// Create New Category
export const createCategories = async (req, res) => {
  try {
    let { title } = req.body;

    const newCategory = new Categories({ title });

    await newCategory.save();

    res.json(newCategory);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};

// Delete Category By Slug in body
export const deleteCategory = async (req, res) => {
  try {
    let { _id } = req.body;

    const category = await Categories.findOne({ _id });

    category.delete();

    res.status(200).json({ message: `category is deleted` });
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};
