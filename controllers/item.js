import ITEM_MODEL from "./../utilities/item-data.js";
import Item from "./../models/item.js";
import Categories from "./../models/categories.js";
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


// Update Ad
export const updateAd = async (req, res) => {
  try {
    const image = req.file;
    const data = req.body;
    const id = req.user.id
    const { _id } = req.headers
    const the_ad = await Item.findById(_id)

    if (the_ad.user == id) {
      if (image) {
        const userImage = the_ad.image;
        const oldImage = userImage.slice(userImage.indexOf("uploads"));
        if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
        data.image = req.protocol + "://" + req.get("host") + "/" + image.path;
      }
      await Item.findByIdAndUpdate(_id, data, { new: true })
      return res.status(200).json({ message: "تم تعديل الاعلان بنجاح" });
    } else {
      return res.status(404).json({ message: 'من انت' });
    }

  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const { _id } = req.headers;
    const userID = req.user.id;
    const item = await Item.findById(_id);
    const image = item.image;
    if (userID == item.user) {
      const oldImage = image.slice(image.indexOf("uploads"));
      if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
      await item.delete();
      return res.status(200).json({ message: `${item.title} deleted` });
    } else {
      return res.status(404).json({ message: 'من انت' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
