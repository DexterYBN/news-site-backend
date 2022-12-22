const { Router } = require("express");
const { newsController } = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/news", newsController.getNews);
router.get("/news/:id", newsController.getNewsById);
router.get("/category/:categoryId", newsController.getNewsByCategoryId);
router.post("/news", authMiddleware, newsController.createNews);
router.delete("/news/:id", authMiddleware, newsController.deleteNews);

module.exports = router;
