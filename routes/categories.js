import express from "express";
const router = express.Router();
import { getCategories, createCategories, getCategoriesByTitle, deleteCategory } from "../controllers/CategoriesController.js"; // Import Controllers

router.get("/", getCategories); // Get All Categories

router.post("/", createCategories); // Post New Category

router.delete("/", deleteCategory); // Delete Category By Slug

router.get("/search", getCategoriesByTitle); // Search For Category By Title

export default router;
