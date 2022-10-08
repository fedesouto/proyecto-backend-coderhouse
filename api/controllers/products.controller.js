const productsService = require("../../services/products.service");


const productsController = {};

productsController.getAll = async (req, res, next) => {
  try {
    const products = await productsService.findAll()
    res.json(products);
  } catch (error) {
    next(error);
  }
};
productsController.addNew = async (req, res, next) => {
  const data = req.body
  try {
    res.json(await productsService.create(data));
  } catch (error) {
    next(error);
  }
};
productsController.getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await productsService.findById(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
productsController.deleteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await productsService.deleteById(id));
  } catch (error) {
    next(error);
  }
};
productsController.updateById = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    res.json(await productsService.updateById(id, data));
  } catch (error) {
    next(error);
  }
};

module.exports = productsController;