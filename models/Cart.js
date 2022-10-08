const { Schema, model } = require('mongoose')
const { ProductSchema } = require('./Product')

const CartSchema = new Schema({
    productos: [{
        ...ProductSchema.obj,
        quantity: Number
    }]
})

const Cart = model('Cart', CartSchema)

module.exports = Cart; 