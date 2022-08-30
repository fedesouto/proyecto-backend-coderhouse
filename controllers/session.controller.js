const { UsuariosDao } = require("../daos");
const { notifyNewUser } = require("../utils/mailer");

const sessionController = {};

sessionController.login = (req, res, _next) => {
  const { id, avatar, name, username, address, phone, age, cartId } = req.user;
  res.json({ id, avatar, name, username, address, phone, age, cartId });
};

sessionController.signup = async (req, res, _next) => {
  const { id, avatar, name, username, address, phone, age, cartId } = req.user;
  await notifyNewUser({ id, name, username, address, phone, age });
  res.json({ id, avatar, name, username, address, phone, age, cartId });
};

sessionController.logout = (req, res, next) => {
  req.logout((error) => {
    if (error) res.status(500).send(`Error: ${error}`);
    else {
      req.session.destroy();
      res.send("success");
    }
  });
};

sessionController.getUser = (req, res, _next) => {
  if (req.user) {
    const { id, avatar, name, username, address, phone, age } = req.user;
    res.json({ id, avatar, name, username, address, phone, age });
  } else res.json({ error: "no esta logueado" });
};

sessionController.updateCartId = async (req, res, next) => {
  const userId = req.params.userId;
  const { cartId } = req.body;
  try {
    await UsuariosDao.updateItem(userId, { cartId: cartId });
    res.json({ userId: "updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = sessionController;
