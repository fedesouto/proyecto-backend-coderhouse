const uniqid = require('uniqid')

class Cart {
    constructor(productos){
        this.id = uniqid()
        this.timestamp = Date.now()
        this.productos = productos
    }
}

module.exports = Cart;