import express from "express";
import { getSpents, postSpent, deleteSpent } from "../controllers/spents.js";

const router = express.Router();

router.get("/", getSpents);
router.post("/", postSpent);
router.delete("/:id", deleteSpent);
export default router;
