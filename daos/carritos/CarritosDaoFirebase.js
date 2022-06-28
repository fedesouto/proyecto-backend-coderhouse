const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");
const { FieldValue } = require("firebase-admin/firestore");
const Cart = require("../../models/Cart");

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }

  async deleteCartItem(cartId, itemId) {
    try {
      const ref = this.query.doc(cartId);
      const doc = await ref.get();
      const itemToDelete = doc
        .data()
        .productos.find((producto) => producto.id === itemId);

      if (!itemToDelete) return new Error("Item does not exist");
      else {
        return await ref.update({
          productos: FieldValue.arrayRemove(itemToDelete),
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async addCartItem(cartId, item) {
    try {
      const ref = this.query.doc(cartId);
      const doc = await ref.get();
      if (doc.exists) {
        await ref.update({
          productos: FieldValue.arrayUnion(item),
        });
        return cartId;
      } else {
        return await this.addItem(new Cart([item]));
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CarritosDaoFirebase;
