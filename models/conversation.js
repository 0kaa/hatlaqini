import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ConversationSchema = Schema({
    sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    received_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    latest_msg: { type: String },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Conversation = mongoose.model("conversation", ConversationSchema);
export default Conversation;