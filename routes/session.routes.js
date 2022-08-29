const { Router } = require("express");
const passport = require("../auth/passport");
const { UsuariosDao } = require("../daos");
const { sessionErrorHandler } = require("../middlewares/errorHandlers");
const uploadFile = require("../middlewares/multer");
const { notifyNewUser } = require("../utils/mailer");

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  sessionErrorHandler,
  (req, res, next) => {
    const { id, avatar, name, username, address, phone, age, cartId } = req.user;
    res.json({ id, avatar, name, username, address, phone, age, cartId });
  }
);

sessionRouter.post(
  "/signup",
  uploadFile.single("avatar"),
  passport.authenticate("signup"),
  sessionErrorHandler,
  async (req, res, next) => {
    const { id, avatar, name, username, address, phone, age, cartId } = req.user;
    await notifyNewUser({id, name, username, address, phone, age})
    res.json({ id, avatar, name, username, address, phone, age, cartId });
  }
);

sessionRouter.get("/user", (req, res, next) => {
  if (req.user) {
    const { id, avatar, name, username, address, phone, age } = req.user;
    res.json({ id, avatar, name, username, address, phone, age });
  } else res.json({error: "no esta logueado"});
});

sessionRouter.put('/user/:userId', async (req, res, next) => {
  const userId = req.params.userId
  const {cartId} = req.body
  console.log(userId, cartId)
  try {
    await UsuariosDao.updateItem(userId, {cartId: cartId})
    res.json({userId: 'updated'})
  } catch (error) {
    next(error)
  }
})

sessionRouter.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) res.status(500).send(`Error: ${error}`);
    else {
      req.session.destroy();
      res.send("success");
    }
  });
});
module.exports = sessionRouter;
