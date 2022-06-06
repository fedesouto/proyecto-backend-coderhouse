const fs = require("fs");
const Product = require("../models/Product");

class ProductsController {
  constructor(filename) {
    this.filename = filename;
  }
  getNextId(items) {
    const ids = items.map((item) => item.id);
    const nextId = Math.max(...ids) + 1;
    return nextId;
  }
  async getAll() {
    //retorna array de objetos
    try {
      const data = await fs.promises.readFile(this.filename, "utf-8");
      const array = await JSON.parse(data);
      return array;
    } catch (error) {
      return error;
    }
  }
  async save(data) {
    await fs.promises.writeFile(this.filename, JSON.stringify(data));
  }
  async addNew(req, res, next) {
    //guarda en archivo y retorna el id
    const data = req.body;
    try {
      const array = await this.getAll();
      if (!array.length) {
        data.id = 1;
        const newProduct = new Product(data);
        await this.save([newProduct]);
      } else {
        data.id = this.getNextId(array);
        const newProduct = new Product(data);
        await this.save([...array, newProduct]);
      }
      res.json(data.id);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    const id = Number(req.params.id);
    try {
      const array = await this.getAll();
      if (!id) {
        res.json(array);
      } else {
        const product = array.find((element) => element.id === id);
        if (!product) res.status(404).send("El producto no existe")
        else res.json(product);
      }
    } catch (error) {
      next(error);
    }
  }
  async updateById(req, res, next) {
    const id = Number(req.params.id)
    const data = req.body;
    const updatedProduct = new Product({id: id, ...data})
    try {
      const array = await this.getAll();
      const product = array.find((element) => element.id === id);
      const newArray = array.map((element) => {
        if (element.id === product.id) return updatedProduct;
        else return element;
      });
      await this.save(newArray);
      res.json(id);
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    const id = Number(req.params.id);
    try {
      const array = await this.getAll();
      const newArray = array.filter((element) => element.id !== id);
      if (newArray.length === array.length) {
        res.status(404).send("El producto no existe")
      } else {
        await this.save(newArray);
        res.json(id)
      }
    } catch (error) {
      next(error)
    }
  }
}

const productos = new ProductsController("productos.txt");

module.exports = productos;
