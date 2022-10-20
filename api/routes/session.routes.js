const { Router } = require("express");
const authController = require("../controllers/session.controller");
const {isAuthenticated, setAvatarFilename} = require("../middlewares/user.middlewares");
const uploadFile = require("../middlewares/multer");

const sessionRouter = Router();

sessionRouter.post("/login", authController.login);

sessionRouter.post(
  "/signup",
  uploadFile.single("avatar"),
  setAvatarFilename,
  authController.signup
);

sessionRouter.get("/user", isAuthenticated, authController.getUserData);

module.exports = sessionRouter;
