import { Conversation, Message, User } from "../models/Model.js";

// Get All Categories
export const getMessageByConversationID = async (req, res) => {
  try {
    const { page = 1, limit = 6, user = "" } = req.query;
    const message = await Message.find({ conversation_id: req.params.id }).populate({
      path: "sender_id",
      select: "_id username",
    })
      .populate({
        path: "received_id",
        select: "_id username",
      }).limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 })
      .exec();
    res.status(200).json({ success: true, messages: message })
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Get All Categories
export const getMessage = async (req, res) => {
  try {
    const message = await Message.find()
      .populate({
        path: "sender_id",
        select: "_id username",
      })
      .populate({
        path: "received_id",
        select: "_id username",
      });
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Chat
export const CreateChat = async (req, res) => {

  try {

    const { msg, conversation_id, sender_id, received_id } = req.body;

    const sender_id_exist = await User.findById(sender_id);

    if (!sender_id_exist) return res.status(404).json({ message: "Sender ID Not Found" });

    const received_id_exist = await User.findById(received_id);

    if (!received_id_exist) return res.status(404).json({ message: "Received ID Not Found" });

    if (sender_id === received_id) return res.status(500).json({ message: "you cant message yourself" });

    let conversation = await Conversation.findById(conversation_id);

    if (
      sender_id != conversation.sender_id &&
      sender_id != conversation.received_id
    ) return res.status(500).json({ message: "this sender_id not in this conversation" });
    if (
      received_id != conversation.sender_id &&
      received_id != conversation.received_id
    ) return res.status(500).json({ message: "this received_id not in this conversation" });

    const newMessage = new Message({
      msg,
      conversation_id,
      sender_id,
      received_id,
    });

    newMessage.save();

    res.status(201).json({ success: true, message: newMessage });

    conversation.latest_msg = newMessage.msg;

    conversation.updateAt = Date.now();

    await conversation.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
