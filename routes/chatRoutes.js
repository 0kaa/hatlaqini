import express from "express";
const router = express.Router();
import { getAllConversations, CreateConversation, } from './../controllers/ConversationController.js'
import { CreateChat, getMessage, getMessageByConversationID } from "./../controllers/chatController.js";

router.get("/conversation", getAllConversations).post("/conversation", CreateConversation);

router.post("/message", CreateChat).get("/message", getMessage);

router.get("/one", getMessageByConversationID);

export default router;
