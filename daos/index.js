const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB')
const ProductosDaoSQL = require('./productos/ProductosDaoSQL')
const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase')
const CarritosDaoSQL = require('./carritos/CarritosDaoSQL')
const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase')
const CarritosDaoMongoDB = require('./carritos/CarritosDaoMongoDB')


const ProductosDao = new ProductosDaoSQL();
const CarritosDao = new CarritosDaoSQL();

module.exports = {ProductosDao, CarritosDao};