import Categories from './../models/categoriesModel.js';
export const getCategories = async (req, res) => {
    const categories = await Categories.find();
    res.json({ categories })
}
export const createCategories = async (req, res) => {
    const { title_ar, title_en, slug } = req.body
    const finalData = {
        ar: title_ar,
        en: title_en
    }
    const newCategory = new Categories({
        title: finalData, slug
    })
    await newCategory.save()

    res.json({ title: finalData, slug })
}