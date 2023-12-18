const express = require("express");

const router = express.Router();

const validateUser = require("./middlewares/validateUser.middlewares");
const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.getUsers);
router.post("/users", validateUser, userControllers.postUser);
router.post("/login", userControllers.postLogin);

module.exports = router;
