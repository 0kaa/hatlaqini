import ITEM_MODEL from "../utilities/item-data.js";
import Item from "./../models/itemModel.js";
import Categories from "./../models/categoriesModel.js";

// Get All Categories
export const getItems = async (req, res) => {
  try {
    const items = await ITEM_MODEL.getAllItems();

    res.status(200).json({ items });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
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
    let { title, categories } = req.body;

    categories = [...new Set(categories)];

    let newItem = new Item({
      title,
      categories,
    });

    await newItem.save();

    res.status(200).json(newItem);

    for (let i = 0; i <= categories.length - 1; i++) {
      let cat = await Categories.findById(categories[i]);

      const items = await Item.find({ categories: categories[i] }).populate("categories");

      cat.itemCounts = items.length;

      cat.save();
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { _id } = req.body;
    const item = await Item.findById(_id);
    res.status(200).json(item);
    let cat = item.categories[0];
    await item.delete();
    let category = await Categories.findById(cat);
    let items = await Item.find({ categories: cat }).populate("categories");
    category.itemCounts = items.length;
    await category.save();
  } catch (error) {
    res.status(404).json(error);
  }
};
