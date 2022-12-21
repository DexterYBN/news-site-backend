const Category = require("../models/Category.model");

module.exports.categoriesController = {
  addCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = await Category.create({ name });
      return res.status(201).json(newCategory);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      res.json(categories);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id);
      return res.json("Category deleted");
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
