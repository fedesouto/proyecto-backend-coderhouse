const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const {mongodbUri} = require("../../config");

class UsuariosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(mongodbUri, "ecommerce", "usuarios");
  }
}

module.exports = UsuariosDaoMongoDB;