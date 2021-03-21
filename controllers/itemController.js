import ITEM_MODEL from "../utilities/item-data.js";
import Item from './../models/itemModel.js';


// Get All Categories
export const getItems = async (req, res) => {

    const items = await ITEM_MODEL.getAllItems()
    res.json({ items });

};
// Create New Item
export const createItem = async (req, res) => {
    let { title, slug, categories } = req.body;

    title = 'hi';
    slug = 'slug hi';
    categories = [
        'hi', 'hi', 'as'
    ]

    const newItem = new Item({
        title, slug, categories
    })
    await newItem.save();
    console.log(newItem)

    res.json(newItem);

};