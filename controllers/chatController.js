import { Conversation, Message } from "./../models/Model.js";

// Get All Categories
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.status(200).json({ success: true, conversations });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Get All Categories
export const getMessageByConversationID = async (req, res) => {
  try {
    const message = await Message.find({ conversation_id: req.query.query }).populate("conversation");
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Get All Categories
export const getMessage = async (req, res) => {
  try {
    const message = await Message.find();
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Create Conversation
export const CreateConversation = async (req, res) => {
  try {
    const newConv = new Conversation({
      sender_id: "604b82b6d3b556429ce27e2e",
      received_id: "605b5e4a3e55c704200db27b",
      latest_msg: "",
    });
    await newConv.save();
    res.status(200).json({ success: true, conversations: newConv });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Create Chat
export const CreateChat = async (req, res) => {
  try {
    const newConv = new Message({
      msg: "4 message",
      conversation_id: "605b5ef000deda0ad89afae1",
      sender_id: "605b5e4a3e55c704200db27b",
      received_id: "604b82b6d3b556429ce27e2e",
    });
    let conv = await Conversation.findById("605b5ef000deda0ad89afae1");
    conv.latest_msg = newConv.msg;
    await conv.save();
    await newConv.save();
    res.status(200).json({ success: true, message: newConv });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
