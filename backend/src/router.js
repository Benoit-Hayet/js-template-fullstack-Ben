const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });

const router = express.Router();

const uploadController = require("./controllers/upload.controller");

const validateUser = require("./middlewares/validateUser.middlewares");
const userControllers = require("./controllers/userControllers");
const {
  authMiddleware,
  authAdminMiddleware,
} = require("./middlewares/Security/auth.middleware");
const currentMiddlewareUser = require("./middlewares/current-user.middleware");

router.get(
  "/users",
  authMiddleware,
  //   autorise l'accès uniquement aux admins
  authAdminMiddleware,
  userControllers.getUsers
);
router.get(
  // permet d'autoriser que les nombres
  "/users/:id([0-9]+)",
  authMiddleware,
  //   autorise à l'utilisateur à qui appartient le compte et aux admins
  currentMiddlewareUser,
  userControllers.getUser
);
router.get("/users/me", authMiddleware, userControllers.getProfile);
router.post("/users", validateUser, userControllers.postUser);
router.post("/login", userControllers.postLogin);
router.get(
  "/admin/fixtures",
  authMiddleware,
  authAdminMiddleware,
  userControllers.loadFixtures
);
// UPLOADS

router.get(
  "/uploads",
  authMiddleware,
  authAdminMiddleware,
  uploadController.getList
);

router.post(
  "/uploads",
  authMiddleware,
  upload.single("avatar"),
  uploadController.create
);

module.exports = router;
