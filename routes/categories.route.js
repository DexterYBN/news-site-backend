const { Router } = require("express");
const {
  categoriesController,
} = require("../controllers/categories.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/categories", categoriesController.getCategories);
router.post("/category", authMiddleware, categoriesController.addCategory);
router.delete("/category/:id", authMiddleware, categoriesController.deleteCategory);

module.exports = router;
