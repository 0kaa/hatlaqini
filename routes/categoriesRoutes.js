import express from "express";
const router = express.Router();
import { getCategories, createCategories } from "../controllers/categoriesController.js";

router.get("/", getCategories);
router.post("/", createCategories);

export default router;
