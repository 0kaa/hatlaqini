import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    title: { type: String, required: true },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now() },
    categories: [
        {
            type: String
        }
    ]
});

const Item = mongoose.model("item", ItemSchema);

export default Item;
