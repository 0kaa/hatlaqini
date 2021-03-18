// Import Categories Model
import Categories from "./../models/categoriesModel.js";

import { string_to_slug } from "./../utilities/heleprs.js";

import messages from "./../utilities/messages.js";

import CATEGORIES_MODEL from "../utilities/categories-data.js";

// Get All Categories
export const getCategories = async (req, res) => {
  const categories = await CATEGORIES_MODEL.getAllCategories();

  res.json({ categories });
};

// Get Categories By Title
export const getCategoriesByTitle = async (req, res) => {
  const categories = await CATEGORIES_MODEL.getCategoryByTitle(req.query.query);
  res.json({ categories });
};

// Create New Category
export const createCategories = async (req, res) => {
  let { title, slug } = req.body;

  slug = string_to_slug(slug);

  const slugExist = await Categories.findOne({ slug });

  if (!slugExist) {
    const newCategory = new Categories({ title, slug });

    await newCategory.save();

    res.json({ title, slug });
  } else {
    res.status(404).json({ message: `${slug} exist before` });
  }
};

// Delete Category By Slug in body
export const deleteCategory = async (req, res) => {
  let { slug } = req.body;
  slug = string_to_slug(slug);

  const category = await Categories.findOne({ slug });

  if (category) category.delete();
  else res.status(404).json({ message: `${slug} ${messages.NOT_FOUND_CATEGORY}` });

  // Return Message in Response
  res.status(200).json({ message: `${slug} category is deleted` });
};
