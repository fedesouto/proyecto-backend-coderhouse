const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const Cart = require("../../models/Cart");
const {mongodbUri} = require("../../config");

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(mongodbUri, "ecommerce", "carritos");
  }
  async deleteCartItem(cartId, itemId) {
    try {
      return await this.mongo
        .db(this.db)
        .collection(this.collection)
        .updateOne({ id: cartId }, { $pull: { productos: { id: itemId } } });
    } catch (error) {
      throw error;
    }
  }
  async addCartItem(cartId, item) {
    try {
      const cart = await this.mongo
        .db(this.db)
        .collection(this.collection)
        .updateOne({ id: cartId }, { $push: { productos: item } });
      if (cart.matchedCount) return cartId;
      else {
        return await this.addItem(JSON.parse(JSON.stringify(new Cart([item]))));
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CarritosDaoMongoDB;
