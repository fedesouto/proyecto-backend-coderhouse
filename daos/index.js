const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB')
const CarritosDaoMongoDB = require('./carritos/CarritosDaoMongoDB')
const UsuariosDaoMongoDB = require('./users/UsuariosDaoMongoDB')

const ProductosDao = new ProductosDaoMongoDB();
const CarritosDao = new CarritosDaoMongoDB();
const UsuariosDao = new UsuariosDaoMongoDB();

module.exports = {ProductosDao, CarritosDao, UsuariosDao};