const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const {mongodbUri} = require("../../config");

class OrdenesDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(mongodbUri, "ecommerce", "ordenes");
  }
}

module.exports = OrdenesDaoMongoDB;