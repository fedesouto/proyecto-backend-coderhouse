const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  products: [{ productId: String, quantity: Number }],
  active: { type: Boolean, default: true },
});

const CartModel = model("Cart", CartSchema);

module.exports = CartModel;
