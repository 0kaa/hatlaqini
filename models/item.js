import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    title: { type: String, required: [true, 'العنوان مطلوب'] },
    image: { type: String, required: [true, 'الصورة مطلوبة'] },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "categories", required: true },
    type: { type: Schema.Types.ObjectId, ref: "type" },
    createdAt: { type: Date, default: Date.now },
    location: { type: Schema.Types.ObjectId, ref: "locations" },
}, {
    timestamps: true
});


const Item = mongoose.model("item", ItemSchema);

export default Item;