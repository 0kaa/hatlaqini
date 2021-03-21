import express from "express";
const router = express.Router();
import { getItems,createItem } from '../controllers/itemController.js'

router.get("/", getItems); // Get All Categories

router.post("/", createItem); // Post New Category

// router.delete("/", deleteCategory); // Delete Category By Slug

// router.get("/search", getCategoriesByTitle); // Search For Category By Title

export default router;
