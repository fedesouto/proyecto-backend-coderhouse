const Cart = require("../../models/Cart");
const { CarritosDao, OrdenesDao } = require("../../daos/index");
const Order = require("../../models/Order");
const { notifyOrder } = require("../../utils/mailer");
const { sendSMSToUser, sendWhatsappToAdmin } = require("../../utils/twilio");

const cartsController = {};

cartsController.getAll = async (req, res, next) => {
  try {
    const carritos = await CarritosDao.getAll();
    res.json(carritos);
  } catch (error) {
    next(error);
  }
};

cartsController.addNew = async (req, res, next) => {
  const data = new Cart(req.body);
  try {
    res.json(await CarritosDao.addItem(JSON.parse(JSON.stringify(data))));
  } catch (error) {
    next(error);
  }
};

cartsController.getById = async (req, res, next) => {
    const id = req.params.id;
  try {
    const data = await CarritosDao.getById(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

cartsController.deleteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await CarritosDao.deleteItem(id));
  } catch (error) {
    next(error);
  }
};

cartsController.addProduct = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    res.json(await CarritosDao.addCartItem(id, data));
  } catch (error) {
    next(error);
  }
};

cartsController.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const id_prod = req.params.id_prod;

  try {
    res.json(await CarritosDao.deleteCartItem(id, id_prod))
  } catch (error) {
    next(error)
  }
};

cartsController.submitOrder = async (req, res, next) => {
  const id = req.params.id;
  const user = req.body.user
  try {
    await CarritosDao.updateItem(id, {completed: true})
    const {productos} = await CarritosDao.getById(id)
    const order = new Order(user, productos)
    await OrdenesDao.addItem(order)
    await notifyOrder(order)
    await sendSMSToUser(user.phone)
    await sendWhatsappToAdmin(`Nueva orden de ${user.name}`)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

module.exports = cartsController;