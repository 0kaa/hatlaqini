import Spents from "../models/spents.js";

// Get Spent Controller
export const getSpents = async (req, res) => {
  const spents = await Spents.find();
  res.status(200).json(spents);
};

// Create Spent Controller
export const postSpent = async (req, res) => {
  const spent = req.body;
  const newSpent = await new Spents(spent);
  newSpent.save();
  res.status(200).json(newSpent);
};

// Delete Spent Controller
export const deleteSpent = async (req, res) => {
  await Spents.findOneAndDelete(req.params.id);
  res.status(200).json("Item Deleted");
};
