const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.getUsers);
router.post("/users", userControllers.postUser);

module.exports = router;
