import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  itemCounts: { type: Number, default: 0 },
});

const ItemSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
});

const UserSchema = Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
  });

const ConversationSchema = Schema({
  sender_id: { type: Schema.Types.ObjectId, ref: "user" },
  received_id: { type: Schema.Types.ObjectId, ref: "user" },
  latest_msg: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

const MessageSchema = Schema({
  msg: { type: String },
  conversation_id: { type: Schema.Types.ObjectId, ref: "conversation" },
  sender_id: { type: Schema.Types.ObjectId, ref: "user" },
  received_id: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now() },
});

export const Categories = mongoose.model("categories", CategoriesSchema);
export const Item = mongoose.model("item", ItemSchema);
export const User = mongoose.model("user", UserSchema);
export const Conversation = mongoose.model("conversation", ConversationSchema);
export const Message = mongoose.model("message", MessageSchema);
