const {Router} = require('express')
const cartsController = require('../controllers/carts.controller')

const cartRouter = Router()

cartRouter.get('/:id/', cartsController.getById)

cartRouter.get('/:id/productos', cartsController.getProducts)

cartRouter.get('/', cartsController.getAll)

cartRouter.post('/', cartsController.addNew)

cartRouter.post('/:id/productos', cartsController.addProduct)

cartRouter.delete('/:id', cartsController.deleteById)

cartRouter.delete('/:id/productos/:id_prod',cartsController.deleteProduct)

cartRouter.post('/:id/checkout', cartsController.submitOrder)


module.exports = cartRouter;