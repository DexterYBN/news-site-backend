const { usersController } = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/users", authMiddleware, usersController.getUsers);
router.post("/login", usersController.login);
router.post("/register", usersController.register);

module.exports = router;
