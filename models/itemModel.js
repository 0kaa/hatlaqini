import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
});

const Item = mongoose.model("item", ItemSchema);

export default Item;
