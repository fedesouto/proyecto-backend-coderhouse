class Product {
  constructor({ id, name, description, code, image, price, stock }) {
    this.id = id;
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
