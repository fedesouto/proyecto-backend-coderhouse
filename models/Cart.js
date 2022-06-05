class Cart {
    constructor({id, productos}){
        this.id = id
        this.timestamp = Date.now()
        this.productos = productos
    }
}

module.exports = Cart;