import { Conversation, Message, User } from "./../models/Model.js";

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
    const message = await Message.find({ conversation_id: req.query.query });
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Get All Categories
export const getMessage = async (req, res) => {
  try {
    const message = await Message.find().populate('user');
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Conversation
export const CreateConversation = async (req, res) => {

  try {
    const { sender_id, received_id } = req.body;

    const sender_id_exsit = await User.findById(sender_id)

    if (!sender_id_exsit) return res.status(500).json({ message: "Sender ID Not Found" })

    const received_id_exsit = await User.findById(received_id)

    if (!received_id_exsit) return res.status(500).json({ message: "Received ID Not Found" })

    if (sender_id === received_id) return res.status(500).json({ message: "you cant message yourself" })

    const conversations = await Conversation.find({ sender_id, received_id })

    if (conversations.length) return res.json({ conversations })

    const conversationsTwo = await Conversation.find({ sender_id: received_id, received_id: sender_id })

    if (conversationsTwo.length) return res.json({ conversations: conversationsTwo })

    const newConv = new Conversation({
      sender_id,
      received_id,
      latest_msg: "",
    });

    res.status(200).json({ success: true, conversations: newConv });

    await newConv.save();

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Chat
export const CreateChat = async (req, res) => {
  try {
    const { msg, conversation_id, sender_id, received_id } = req.body;
    const newConv = new Message({
      msg,
      conversation_id,
      sender_id,
      received_id
    });

    res.status(200).json({ success: true, message: newConv });
    await newConv.save();

    let conv = await Conversation.findById(conversation_id);

    conv.latest_msg = newConv.msg;
    conv.updateAt = Date.now();
    await conv.save();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
