import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

const ItemSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  type: { type: String },
  createdAt: { type: Date, default: Date.now() },
  location: { type: Schema.Types.ObjectId, ref: "locations" },
});

const LocationsSchema = Schema({
  title: { type: String, default: "" },
  lat: { type: Number },
  lng: { type: Number }
});

const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const ConversationSchema = Schema({
  sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  received_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  latest_msg: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

const MessageSchema = Schema({
  msg: { type: String, required: true },
  conversation_id: { type: Schema.Types.ObjectId, ref: "conversation", required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  received_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now() },
});

export const Categories = mongoose.model("categories", CategoriesSchema);
export const Item = mongoose.model("item", ItemSchema);
export const User = mongoose.model("user", UserSchema);
export const Conversation = mongoose.model("conversation", ConversationSchema);
export const Locations = mongoose.model("locations", LocationsSchema);
export const Message = mongoose.model("message", MessageSchema);
