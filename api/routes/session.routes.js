const { Router } = require("express");
const passport = require("../../auth/passport");
const authService = require("../../services/auth.service");
const authController = require("../controllers/session.controller");
const isAuthenticated = require("../middlewares/auth");
const { sessionErrorHandler } = require("../middlewares/errorHandlers");
const uploadFile = require("../middlewares/multer");

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  async (req, res, next) => {
    const {username, password} = req.body;
    const token = await authService.signIn(username, password)
    res.json(token)
  }
);

sessionRouter.post(
  "/signup",
  //uploadFile.single("avatar"),
  authController.signup
);

sessionRouter.get("/user", isAuthenticated, authController.getUserData);


module.exports = sessionRouter;
