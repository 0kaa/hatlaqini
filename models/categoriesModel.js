import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = Schema({
  title: { type: String, required: true },
  slug: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const Categories = mongoose.model("categories", CategoriesSchema);

export default Categories;
