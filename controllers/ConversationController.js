import { Conversation, User } from "./../models/Model.js";

// Get All Categories
export const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find()
            .populate({
                path: "sender_id",
                select: "_id username",
            })
            .populate({
                path: "received_id",
                select: "_id username",
            });
        res.status(200).json({ success: true, conversations });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

// Create Conversation
export const CreateConversation = async (req, res) => {
    try {
        const { sender_id, received_id } = req.body;

        const sender_id_exsit = await User.findById(sender_id);

        if (!sender_id_exsit) return res.status(404).json({ message: "Sender ID Not Found" });

        const received_id_exsit = await User.findById(received_id);

        if (!received_id_exsit) return res.status(404).json({ message: "Received ID Not Found" });

        if (sender_id === received_id) return res.status(500).json({ message: "you cant message yourself" });

        const conversations = await Conversation.find({ sender_id, received_id });

        if (conversations.length) return res.status(200).json({ conversations });

        const conversationsTwo = await Conversation.find({ sender_id: received_id, received_id: sender_id });

        if (conversationsTwo.length) return res.status(200).json({ conversations: conversationsTwo });

        const newConv = new Conversation({
            sender_id,
            received_id,
            latest_msg: "",
        });

        await newConv.save();

        res.status(200).json({ success: true, conversations: newConv });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
