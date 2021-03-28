import express from "express";
const router = express.Router();
import { getItems, createItem, getItemsByCatID, deleteItem, getSingleItem } from "../controllers/ItemController.js";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads") },
    filename: function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname.replace(' ', '-')); },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") cb(null, true)
    else cb(null, false)
};
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter })

router.get("/", getItems) // Get All Categories

router.get('/:_id', getSingleItem)

router.post("/", upload.single("image"), createItem) // Post New Category

router.get("/cat", getItemsByCatID) // Post New Category

router.delete("/", deleteItem) // Delete Category By Slug

// router.get("/search", getCategoriesByTitle); // Search For Category By Title

export default router;
