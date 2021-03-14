import Categories from "./../models/categoriesModel.js";
export const getCategories = async (req, res) => {
  const categories = await Categories.find({
    title: { $regex: req.query.query, $options: "$i" },
  });
  res.json({ categories });
};
export const createCategories = async (req, res) => {
  const { title, slug } = req.body;

  const newCategory = new Categories({
    title,
    slug,
  });
  await newCategory.save();

  res.json({ title, slug });
};
