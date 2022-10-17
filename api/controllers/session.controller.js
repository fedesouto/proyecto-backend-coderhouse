const authService = require("../../services/auth.service");
const usersService = require("../../services/users.service");
const { notifyNewUser } = require("../../utils/mailer");

const authController = {};

authController.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const payload = await authService.signIn(username, password)
    res.json(payload)
  } catch (error) {
    next(error)
  }
};

authController.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    const payload = await authService.signUp(newUser)
    //await notifyNewUser({ id, name, username, address, phone, age });
    res.json(payload);
  } catch (error) {
    next(error)
  }
};

authController.getUserData = async (req, res, next) => {
  try {
    const user = req.user
    delete user.password
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = authController;
