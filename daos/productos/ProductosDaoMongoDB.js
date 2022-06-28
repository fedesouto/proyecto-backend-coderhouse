const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const {mongodbUri} = require("../../config");

class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(mongodbUri, "ecommerce", "productos");
  }
}

module.exports = ProductosDaoMongoDB;
