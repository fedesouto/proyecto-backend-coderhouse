const { Router } = require("express");
const isAuthorized = require("../middlewares/auth");
const productsController = require("../controllers/products.controller");

const productRouter = Router();

productRouter.get("/", productsController.getAll);

productRouter.get("/:id?", productsController.getById);

productRouter.post("/", isAuthorized, productsController.addNew);

productRouter.put("/:id", isAuthorized, productsController.updateById);

productRouter.delete("/:id", isAuthorized, productsController.deleteById);

module.exports = productRouter;
