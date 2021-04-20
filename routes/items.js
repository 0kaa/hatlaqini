import express from "express";
const router = express.Router();
import { getItems, createItem, getItemsByCatID, deleteItem, getSingleItem, updateAd } from "./../controllers/item.js";
import upload from './../utilities/upload.js'
import auth from "./../middleware/auth.js";


router.get("/", getItems); // Get All Categories

router.get('/:_id', getSingleItem);

router.post("/", upload.single("image"), createItem) // Post New Category

router.post("/:_id", [auth, upload.single("image")], updateAd) // Post New Category

router.get("/category/:_id", getItemsByCatID) // Post New Category

router.delete("/", auth, deleteItem) // Delete Category By Slug

// router.get("/search", getCategoriesByTitle); // Search For Category By Title

export default router;
