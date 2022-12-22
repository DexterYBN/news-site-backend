const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "News",
  },
  createdAt: {
    type: Date,
    default: Date.parse,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
