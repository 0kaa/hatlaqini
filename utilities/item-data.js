import Item from "../models/itemModel.js";

const ITEM_MODEL = {
    getAllItems: () => {
        return Item.find();
    },
    getItemByTitle: (q) => {
        return Item.find({ title: { $regex: q, $options: "$i" } });
    },
};

export default ITEM_MODEL;
