import express from "express";
const router = express.Router();
import { CreateConversation, } from '../controllers/ConversationController.js'

import { CreateChat, getMessage, getMessageByConversationID } from "../controllers/MessageController.js";

router.post("/conversation", CreateConversation);

router.post("/message", CreateChat).get("/message", getMessage);

router.get("/:id", getMessageByConversationID);

export default router;
