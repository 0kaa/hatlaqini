import mongoose from "mongoose";

const spentsSchema = mongoose.Schema({
  created_at: { type: Date, default: new Date() },
  cost: { type: Number },
  spend_in: { type: String },
});

const Spents = mongoose.model("Spents", spentsSchema);

export default Spents;
