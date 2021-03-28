import { Categories } from "../models/Model.js";

const CATEGORIES_MODEL = {
  getAllCategories: () => {
    return Categories.find();
  },
  getCategoryByTitle: (q) => {
    return Categories.find({ title: { $regex: q, $options: "$i" } });
  },
};

export default CATEGORIES_MODEL;