const uniqid = require('uniqid')

class Order {
    constructor(user, productos){
        this.id = uniqid()
        this.timestamp = Date.now()
        this.user = user
        this.productos = productos
        this.total = productos.reduce((a, b) => a + (b.quantity * Number(b.price)), 0)
    }
}

module.exports = Order;