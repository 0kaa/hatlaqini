// Import Categories Model
import Categories from "./../models/categoriesModel.js";
import { string_to_slug } from './../utilities/heleprs.js'


// Get All Categories
export const getCategories = async (req, res) => {

  const categories = await Categories.find();

  res.json({ categories });

};

// Get Categories By Title
export const getCategoriesByTitle = async (req, res) => {

  const categories = await Categories.find({ title: { $regex: req.query.query, $options: "$i" } });

  res.json({ categories });

};

// Create New Category
export const createCategories = async (req, res) => {

  const { title, slug } = req.body;

  const newSlug = string_to_slug(slug);

  const slugExist = await Categories.findOne({ slug: newSlug });

  if (slugExist) {

    res.status(404).json({ message: "Slug Exist" })

  } else {

    const newCategory = new Categories({ title, slug: newSlug, });

    await newCategory.save();

    res.json({ title, slug: newSlug });
  }

};
