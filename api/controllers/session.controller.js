const usersService = require("../../services/users.service");
const { notifyNewUser } = require("../../utils/mailer");

const authController = {};

authController.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authService.signIn(username, password)
    res.json(user)
  } catch (error) {
    next(error)
  }
};

authController.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    const createdUser = await usersService.create(newUser);
    //await notifyNewUser({ id, name, username, address, phone, age });
    res.json(createdUser);
  } catch (error) {
    next(error)
  }
};


module.exports = authController;
