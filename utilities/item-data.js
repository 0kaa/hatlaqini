import Item from "../models/item.js";

const ITEM_MODEL = {
  getAllItems: () => {
    return Item.find().populate("category").populate("location").populate({
      path: 'user',
      select: '-password'
    }).populate('type').sort({ 'createdAt': -1 });
  },
  searchItem: (title, category) => {
    if (title && category)
      return Item.find({ $and: [{ title: { $regex: title, $options: "$i" } }, { category }] }).populate("category").populate("location").populate({
        path: 'user',
        select: '-password'
      }).populate('type').sort({ 'createdAt': -1 });
    else if (title)
      return Item.find({ title: { $regex: title, $options: "$i" } }).populate("category").populate("location").populate({
        path: 'user',
        select: '-password'
      }).populate('type').sort({ 'createdAt': -1 });
    else if (category)
      return Item.find({ category }).populate("category").populate("location").populate({
        path: 'user',
        select: '-password'
      }).populate('type').sort({ 'createdAt': -1 });
    else return Item.find().populate("category").populate("location").populate({
      path: 'user',
      select: '-password'
    }).populate('type').sort({ 'createdAt': -1 });
  },
  getSingleItem: (_id) => {
    return Item.findOne({ _id })
  },
  itemsByCatID: (id) => {
    return Item.find({ category: id }).populate("category").populate({
      path: 'user',
      select: '-password'
    }).populate('type').sort({ 'createdAt': -1 });
  }
};

export default ITEM_MODEL;
