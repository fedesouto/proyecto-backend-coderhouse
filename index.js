const ProductosDaoMongoDB = require('./daos/productos/ProductosDaoMongoDB')

const ProductosDao = new ProductosDaoMongoDB();

module.exports = ProductosDao;