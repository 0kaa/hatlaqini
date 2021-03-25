import { Conversation, Message, User } from "./../models/Model.js";

// Get All Categories
export const getMessageByConversationID = async (req, res) => {
  try {
    const message = await Message.find({ conversation_id: req.query.query });
    res.status(200).json({ success: true, message });
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

    const sender_id_exsit = await User.findById(sender_id);

    if (!sender_id_exsit) return res.status(404).json({ message: "Sender ID Not Found" });

    const received_id_exsit = await User.findById(received_id);

    if (!received_id_exsit) return res.status(404).json({ message: "Received ID Not Found" });

    if (sender_id === received_id) return res.status(500).json({ message: "you cant message yourself" });

    const conversation = await Conversation.findById(conversation_id);

    if (
      sender_id != conversation.sender_id &&
      sender_id != conversation.received_id
    ) return res.status(500).json({ message: "this sender_id not in this conversation" });
    if (
      received_id != conversation.sender_id &&
      received_id != conversation.received_id
    ) return res.status(500).json({ message: "this received_id not in this conversation" });

    const newConv = new Message({
      msg,
      conversation_id,
      sender_id,
      received_id,
    });

    await newConv.save();

    res.status(200).json({ success: true, message: newConv });

    let conv = await Conversation.findById(conversation_id);

    conv.latest_msg = newConv.msg;

    conv.updateAt = Date.now();

    await conv.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
