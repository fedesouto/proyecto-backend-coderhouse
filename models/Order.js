const {Schema, model} = require('mongoose')

const ItemSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    subtotal: Number
})

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [ItemSchema],
    total: Number
})

const OrderModel = model("Order", OrderSchema)

module.exports = OrderModel;