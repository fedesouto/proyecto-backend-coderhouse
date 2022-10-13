const CartModel = require("../models/Cart");

const cartsService = {};

cartsService.findAll = async () => {
  try {
    const carts = await CartModel.find().exec();
    return carts;
  } catch (error) {
    throw error;
  }
};

cartsService.findById = async (id) => {
  try {
    const cart = await CartModel.findOne({ _id: id }).exec();
    return cart;
  } catch (error) {
    throw error;
  }
};

cartsService.create = async (cartDto) => {
  try {
    const createdCart = await CartModel.create(cartDto);
    return createdCart.id;
  } catch (error) {
    throw error;
  }
};

cartsService.updateById = async (id, cartDto) => {
  try {
    const updatedCart = await CartModel.updateOne({ _id: id }, cartDto);
    return updatedCart.id;
  } catch (error) {
    throw error;
  }
};

cartsService.deleteById = async (id) => {
  try {
    const deletedCart = await CartModel.deleteOne({ _id: id });
    return deletedCart;
  } catch (error) {
    throw error;
  }
};

cartsService.addProduct = async (id, addProductDto) => {
  try {
    const cart = await cartsService.findById(id);
    if (cart?.id) {
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === addProductDto.product
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += addProductDto.quantity;
      } else {
        cart.products.push(addProductDto);
      }
      return await cart.save();
    }
    return await cartsService.create({ products: [addProductDto] });
  } catch (error) {
    throw error;
  }
};

cartsService.deleteProduct = async (cartId, productId) => {
  try {
    const cart = await cartsService.findById(cartId);
    if (cart?.id) {
      const updatedProducts = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
      if (updatedProducts.length === cart.products.length) {
        throw new Error("Product does not exist in cart.");
      } else {
        cart.products = updatedProducts;
        return await cart.save();
      }
    }
  } catch (error) {
    throw error;
  }
};

cartsService.findCartProducts = async (id) => {
  try {
    const cart = await CartModel.findOne({ _id: id }).populate('products.product').exec();
    return cart;
  } catch (error) {
    throw error;
  }
};

module.exports = cartsService;
