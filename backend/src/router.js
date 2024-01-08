const express = require("express");

const router = express.Router();

const validateUser = require("./middlewares/validateUser.middlewares");
const userControllers = require("./controllers/userControllers");
const { authMiddleware } = require("./middlewares/Security/auth.middleware");

router.get("/users", userControllers.getUsers);
router.get("/users/me", authMiddleware, userControllers.getProfile);
router.post("/users", validateUser, userControllers.postUser);
router.post("/login", userControllers.postLogin);

module.exports = router;
