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
  async addNew(data) {
    //guarda en archivo y retorna el id
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

      return data.id;
    } catch (error) {
      return error;
    }
  }
  async getById(id) {
    try {
      const array = await this.getAll();
      const product = array.find((element) => element.id === id);
      if (!product) throw new Error("El producto no existe");
      else return product;
    } catch (error) {
      return error;
    }
  }
  async updateById(id, data) {
    try {
      const product = await this.getById(id);
      for (let i in product) {
        if (i !== "id" && i !== "timestamp") product[i] = data[i];
      }
      product.timestamp = Date.now();
      const array = await this.getAll();
      const newArray = array.map((element) => {
        if (element.id === product.id) return product;
        else return element;
      });
      await this.save(newArray);
      return id;
    } catch (error) {
      return error;
    }
  }
  async deleteById(id) {
    try {
      const array = await this.getAll();
      const newArray = array.filter((element) => element.id !== id);
      if (newArray.length === array.length)
        throw new Error("El producto no existe");
      await this.save(newArray);
      return id;
    } catch (error) {
      return error;
    }
  }
}

const productos = new ProductsController("productos.txt");

module.exports = productos;
