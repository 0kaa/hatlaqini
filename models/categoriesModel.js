import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
    title: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
    },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now() }
});

const Categories = mongoose.model("categories", CategoriesSchema);

export default Categories;
