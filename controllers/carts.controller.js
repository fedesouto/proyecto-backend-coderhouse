const Cart = require('../models/Cart')
const fs = require('fs')

class CartsController {
    constructor(filename) {
        this.filename = filename;
    }
    calcNextId(items) {
        const ids = items.map((item) => item.id);
        const nextId = Math.max(...ids) + 1;
        return nextId;
    }
    async save(data) {
        await fs.promises.writeFile(this.filename, JSON.stringify(data));
    }
    async getAll() {
        const data = await fs.promises.readFile(this.filename, "utf-8")
        const array = await JSON.parse(data);
        return array;
    }
    async getById(req, res, next) {
        const id = Number(req.params.id)
        try {
            const array = await this.getAll()
            const products = array.find(cart => cart.id === id)
            if (!products) res.status(404).send('El carrito no existe')
            else {
                res.json(products)
            }
        } catch (error) {
            next(error)
        }
    }
    async createNew(req, res, next) {
        const data = req.body;
        const newCart = new Cart({productos: data})
        try {
            const carts = await this.getAll()
            if (!carts.length) {
                newCart.id = 1;
                await this.save([newCart])
                res.json(newCart.id)
            }
            else {
                newCart.id = this.calcNextId(carts)
                await this.save([...carts, newCart])
                res.json(newCart.id)
            }
        } catch (error) {
            next(error)
        }
    }
    async deleteCart(req, res, next) {
        const id = Number(req.params.id)
        try {
            const carts = await this.getAll()
            const newCart = carts.filter(cart => cart.id !== id)
            if (newCart.length == carts.length) {
                res.status(404).send('El carrito no existe')
            }
            else {
                await this.save(newCart)
                res.json('carrito eliminado')
            }
        } catch (error) {
            next(error)
        }
    }
    async deleteProduct(req, res, next) {
        const cartId = Number(req.params.id)
        const productId = Number(req.params.id_prod)
        try {
            const carts = await this.getAll()
            const newCarts = carts.map(cart => {
                if (cart.id === cartId) {
                    const newProducts = cart.productos.filter(product => product.id !== productId)
                    cart.productos = newProducts
                    return cart;
                }
                else return cart;
            })
            await this.save(newCarts)
            res.json('producto del carrito eliminado')
        } catch (error) {
            next(error)
        }
    }
    async addProduct(req, res, next) {
        const id = Number(req.params.id)
        const product = req.body
        try {
            const carts = await this.getAll()
            const newCarts = carts.map(cart => {
                if (cart.id === id) {
                    cart.productos = [...cart.productos, product]
                    return cart
                }
                else return cart
            })
            await this.save(newCarts)
            res.json('se agrego un producto nuevo al carrito')
        } catch (error) {
            next(error)
        }

    }

}

const carritos = new CartsController('carritos.txt')

module.exports = carritos;