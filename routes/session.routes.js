const { Router } = require("express");
const passport = require("../auth/passport");
const sessionController = require("../controllers/session.controller");
const { sessionErrorHandler } = require("../middlewares/errorHandlers");
const uploadFile = require("../middlewares/multer");

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  sessionErrorHandler,
  sessionController.login
);

sessionRouter.post(
  "/signup",
  uploadFile.single("avatar"),
  passport.authenticate("signup"),
  sessionErrorHandler,
  sessionController.signup
);

sessionRouter.get("/user", sessionController.getUser);

sessionRouter.put("/user/:userId/cart", sessionController.updateCartId);

sessionRouter.post("/logout", sessionController.logout);

module.exports = sessionRouter;
