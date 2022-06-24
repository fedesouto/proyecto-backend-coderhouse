const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB')

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        const uri = 'mongodb+srv://federoot:federoot@cluster0.iiotc.mongodb.net/?retryWrites=true&w=majority'
        super(uri, 'ecommerce', 'productos')
    }
}

module.exports = ProductosDaoMongoDB;