import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const Categories = mongoose.model("categories", CategoriesSchema);

export default Categories;