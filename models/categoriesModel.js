import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  itemCounts: { type: Number, default: 0 },
});

const Categories = mongoose.model("categories", CategoriesSchema);

export default Categories;
