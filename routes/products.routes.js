const { Router } = require("express");
const productos = require("../controllers/products.controller");

const productRouter = Router();

productRouter.get("/:id?", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
        const data = await productos.getAll();
        res.json(data);
  } else {
    const data = await productos.getById(id);
    res.json(data);
  }
});

productRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  await productos.addNew(newProduct);
  res.json("nuevo producto");
});

productRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const newData = req.body;
  await productos.updateById(id, newData);
  res.json("actualizar producto");
});

productRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await productos.deleteById(id);
  res.json("producto eliminado");
});


module.exports = productRouter;
