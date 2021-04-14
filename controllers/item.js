import ITEM_MODEL from "../utilities/item-data.js";
import { Item, Categories } from "../models/model.js";
import fs from "fs";
// Get All Categories
export const getItems = async (req, res) => {
  try {
    const items = await ITEM_MODEL.searchItem(req.query.title, req.query.category);

    res.status(200).json({ items });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleItem = async (req, res) => {
  const items = await ITEM_MODEL.getSingleItem(req.params._id)
  return res.status(200).json(items)
}

// Get Categories By Title
export const getItemsByTitle = async (req, res) => {
  try {
    const items = await Item.find()
    return res.json(items)
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};


// Get All Categories
export const getItemsByCatID = async (req, res) => {
  try {
    const id = req.params._id;

    let items = await ITEM_MODEL.itemsByCatID(id);

    let category = await Categories.findById(id);

    res.status(200).json({ category, items, });
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
      return res.status(400).json({
        errors: {
          image: {
            message: "الصورة مطلوبة"
          }
        }
      })
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
