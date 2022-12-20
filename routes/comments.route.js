const { commentsController } = require("../controllers/comment.controller");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/comments", commentsController.getComments);
router.post("/comment", authMiddleware, commentsController.addComment);
router.delete("/comment/:id", authMiddleware, commentsController.deleteComment);

module.exports = router;
