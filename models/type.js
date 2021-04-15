import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TypeSchema = Schema({
    title: { type: String, required: true },
});

const Type = mongoose.model("type", TypeSchema);

export default Type;
