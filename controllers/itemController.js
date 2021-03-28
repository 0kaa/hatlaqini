import ITEM_MODEL from "../utilities/item-data.js";
import { Item } from "../models/Model.js";
import fs from "fs";
// Get All Categories
export const getItems = async (req, res) => {
  try {
    const items = await ITEM_MODEL.getAllItems();

    res.status(200).json({ items });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleItem = async (req, res) => {
  const items = await ITEM_MODEL.getSingleItem(req.params._id)
  return res.status(200).json(items)
}


// Get All Categories
export const getItemsByCatID = async (req, res) => {
  try {
    const id = req.query.id;

    let items, itemCounts;
    items = await Item.find({ categories: id });

    itemCounts = items.length;

    res.status(200).json({ items, itemCounts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
// Create New Item
export const createItem = async (req, res) => {
  try {
    const image = req.file;
    const data = req.body;
    if (image) {
      data.image = req.protocol + "://" + req.get("host") + "/" + image.path;
    } else {
      res.status(404).json({ message: "Image Required" });
    }
    let newItem = new Item(data);
    await newItem.save();
    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { _id } = req.headers;
    const item = await Item.findById(_id);
    const image = item.image;
    const oldImage = image.slice(image.indexOf("uploads"));
    fs.unlinkSync(oldImage);
    await item.delete();
    res.status(200).json({ message: `${item.title} deleted` });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
