import { Item } from "../models/Model.js";

const ITEM_MODEL = {
  getAllItems: () => {
    return Item.find().populate({
      path: "category",
      select: "-createdAt"
    }).populate("location").populate({
      path: 'user',
      select: '-password'
    }).populate('type').sort({ 'createdAt': -1 });
  },
  getItemByTitle: (q) => {
    return Item.find({ title: { $regex: q, $options: "$i" } }).sort({ 'createdAt': -1 });
  },
  getSingleItem: (_id) => {
    return Item.findOne({ _id })
  },
  itemsByCatID: (id) => {
    return Item.find({ category: id }).populate({
      path: "category",
      select: "-createdAt"
    }).populate({
      path: 'user',
      select: '-password'
    }).populate('type').sort({ 'createdAt': -1 });
  }
};

export default ITEM_MODEL;
