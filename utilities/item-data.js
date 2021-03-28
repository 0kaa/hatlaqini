import { Item } from "../models/Model.js";

const ITEM_MODEL = {
  getAllItems: () => {
    return Item.find().populate({
      path: "category",
      select: "-createdAt"
    }).populate("location");
  },
  getItemByTitle: (q) => {
    return Item.find({ title: { $regex: q, $options: "$i" } });
  },
  getSingleItem: (_id) => {
    return Item.findOne({ _id })
  }
};

export default ITEM_MODEL;
