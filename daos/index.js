const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB')
const CarritosDaoMongoDB = require('./carritos/CarritosDaoMongoDB')
const UsuariosDaoMongoDB = require('./users/UsuariosDaoMongoDB');
const OrdenesDaoMongoDB = require('./ordenes/OrdenesDaoMongoDB');

const ProductosDao = new ProductosDaoMongoDB();
const CarritosDao = new CarritosDaoMongoDB();
const UsuariosDao = new UsuariosDaoMongoDB();
const OrdenesDao = new OrdenesDaoMongoDB()