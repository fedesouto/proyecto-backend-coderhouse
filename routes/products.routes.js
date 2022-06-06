const { Router } = require("express");
const productos = require("../controllers/products.controller");
const isAuthorized = require('../middlewares/auth')

const productRouter = Router();

productRouter.get("/:id?", async (req, res, next) => {
  await productos.getById(req, res, next);
});

productRouter.post("/", isAuthorized, async (req, res, next) => {
  await productos.addNew(req, res, next);
});

productRouter.put("/:id", isAuthorized, async (req, res, next) => {
  await productos.updateById(req, res, next)
});

productRouter.delete("/:id", isAuthorized, async (req, res, next) => {
  await productos.deleteById(req, res, next)
});

module.exports = productRouter;
