const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB')
const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase')
const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase')
const CarritosDaoMongoDB = require('./carritos/CarritosDaoMongoDB')


const ProductosDao = new ProductosDaoMongoDB();
const CarritosDao = new CarritosDaoMongoDB();

module.exports = {ProductosDao, CarritosDao};