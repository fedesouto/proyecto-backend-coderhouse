const {Router} = require('express')

const cartRouter = Router()

cartRouter.get('/:id/productos', (req, res) => {
    const id = req.params.id;
    res.json('productos del carrito')
})

cartRouter.post('/', (req, res) => {
    const newCart = req.body
    res.json('nuevo carrito')
})

cartRouter.post('/:id/productos', (req, res) => {
    const id = req.params.id;
    const newProduct = req.body
    res.json('nuevo producto')
})

cartRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json('carrito eliminado')
})

cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod
    res.json('producto del carrito eliminado')
})

module.exports = cartRouter;