const News = require("../models/News.model");

module.exports.newsController = {
  createNews: async (req, res) => {
    const { title, subtitle, category } = req.body;
    try {
      const news = await News.create({ title, subtitle, category });
      return res.status(201).json(news);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getNews: async (req, res) => {
    try {
      const news = await News.find().populate("category");
      return res.json(news);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getNewsById: async (req, res) => {
    try {
      const news = await News.findById(req.params.id);
      return res.json(news);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getNewsByCategoryId: async (req, res) => {
    try {
      const news = await News.find({
        category: req.params.categoryId,
      }).populate("category");
      return res.json(news);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  deleteNews: async (req, res) => {
    try {
      await News.findByIdAndRemove(req.params.id);
      return res.json("News deleted");
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
