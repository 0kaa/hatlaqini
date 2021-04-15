import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    msg: { type: String, required: true },
    conversation_id: { type: Schema.Types.ObjectId, ref: "conversation", required: true },
    sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    received_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Message = mongoose.model("message", MessageSchema);

export default Message;

