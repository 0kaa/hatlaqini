import express from "express";
const router = express.Router();
import { getItems, createItem, getItemsByCatID, deleteItem, getSingleItem } from "../controllers/ItemController.js";
import upload from './../utilities/upload.js'

router.get("/", getItems); // Get All Categories

router.get('/:_id', getSingleItem);

router.post("/", upload.single("image"), createItem) // Post New Category

router.get("/category/:_id", getItemsByCatID) // Post New Category

router.delete("/", deleteItem) // Delete Category By Slug

// router.get("/search", getCategoriesByTitle); // Search For Category By Title

export default router;
