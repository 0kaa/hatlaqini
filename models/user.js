import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const User = mongoose.model("user", UserSchema);
export default User;