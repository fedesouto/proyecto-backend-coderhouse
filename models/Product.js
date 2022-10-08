const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  stock: Number,
  category: String
})


const ProductModel = model('Product', ProductSchema);


module.exports = {ProductModel, ProductSchema}
