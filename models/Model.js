import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

const ItemSchema = Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  type: { type: Schema.Types.ObjectId, ref: "type" },
  createdAt: { type: Date, default: Date.now() },
  location: { type: Schema.Types.ObjectId, ref: "locations" },
});

const TypeSchema = Schema({
  title: { type: String, required: true },
});

const LocationsSchema = Schema({
  title: { type: String, default: "", required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
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
export const Type = mongoose.model("type", TypeSchema);
export const User = mongoose.model("user", UserSchema);
export const Conversation = mongoose.model("conversation", ConversationSchema);
export const Locations = mongoose.model("locations", LocationsSchema);
export const Message = mongoose.model("message", MessageSchema);
