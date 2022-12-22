const Comment = require("../models/Comment.model");

module.exports.commentsController = {
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate("user");

      res.json(comments);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;

    try {
      const comment = await Comment.findById(id);
      if (comment.user.toString() === req.user.id) {
        await comment.remove();
        return res.json("Deleted");
      }
      return res
        .status(403)
        .json({ error: "You don't have permission to delete" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  addComment: async (req, res) => {
    const { text } = req.body;

    try {
      const newComment = await Comment.create({
        user: req.user.id,
        text,
        news: req.body.news,
        createdAt: new Date(),
      });
      return res.status(201).json(newComment);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
