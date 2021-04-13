import express from "express";
import { CreateConversation, getConversationsByUserID } from '../controllers/ConversationController.js'
import { CreateChat, getMessage, getMessageByConversationID } from "../controllers/MessageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/conversation", CreateConversation);

router.get('/conversations', auth, getConversationsByUserID)

router.post("/message", CreateChat).get("/message", getMessage);

router.get("/:_id", getMessageByConversationID);

export default router;
