import express from "express";
const router = express.Router();
import { getCategories, createCategories, getCategoriesByTitle } from "../controllers/categoriesController.js";

router.get("/", getCategories);
router.get("/search", getCategoriesByTitle);
router.post("/", createCategories);

export default router;
