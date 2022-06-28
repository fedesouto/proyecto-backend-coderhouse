const uniqid = require('uniqid')

class Product {
  constructor({ name, description, code, image, price, stock }) {
    this.id = uniqid()
    this.timestamp = Date.now();
    this.name = name;
    this.description = description;
    this.code = code;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }
}

module.exports = Product;
