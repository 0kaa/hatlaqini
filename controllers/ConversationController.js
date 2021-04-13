import { Conversation, User } from "./../models/Model.js";
import mongoose from "mongoose";
// Create Conversation
export const CreateConversation = async (req, res) => {
    try {
        const { sender_id, received_id } = req.body;

        const sender_id_exsit = await User.findById(sender_id);

        if (!sender_id_exsit) return res.status(404).json({ message: "Sender ID Not Found" });

        const received_id_exsit = await User.findById(received_id);

        if (!received_id_exsit) return res.status(404).json({ message: "Received ID Not Found" });

        if (sender_id === received_id) return res.status(500).json({ message: "you cant message yourself" });

        const conversation = await Conversation.findOne({ sender_id, received_id });

        if (conversation) return res.status(200).json({ conversation });

        const conversationsTwo = await Conversation.findOne({ sender_id: received_id, received_id: sender_id });

        if (conversationsTwo) return res.status(200).json({ conversation: conversationsTwo });

        const newConv = new Conversation({
            sender_id,
            received_id,
            latest_msg: "",
        });

        await newConv.save();

        res.status(200).json({ success: true, conversation: newConv });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getConversationsByUserID = async (req, res) => {
    try {
        const id = req.user.id;
        const conversations = await Conversation.find({ $or: [{ sender_id: id }, { received_id: id }] }).populate({
            path: "sender_id",
            select: "_id username image",
        })
            .populate({
                path: "received_id",
                select: "_id username image",
            })
        res.json({ conversations })
    } catch (error) {
        res.status(404).json(error.message)
    }
}