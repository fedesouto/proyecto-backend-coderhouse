const {Router} = require('express')
const carritos = require('../controllers/carts.controller')

const cartRouter = Router()

cartRouter.get('/:id/productos', async (req, res, next) => {
    await carritos.getById(req, res, next)
})

cartRouter.post('/', async (req, res, next) => {
    await carritos.createNew(req, res, next)
})

cartRouter.post('/:id/productos', async (req, res, next) => {
    await carritos.addProduct(req, res, next)
})

cartRouter.delete('/:id', async (req, res, next) => {
    await carritos.deleteCart(req, res, next)
})

cartRouter.delete('/:id/productos/:id_prod', async(req, res, next) => {
    await carritos.deleteProduct(req, res, next)
})

module.exports = cartRouter;