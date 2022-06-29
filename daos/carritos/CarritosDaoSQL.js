const ContenedorSQL = require("../../contenedores/ContenedorSQL");
const path = require("path");
const Cart = require("../../models/Cart");

class CarritosDaoSQL extends ContenedorSQL {
  constructor() {
    super("carritos", {
      client: "sqlite3",
      connection: {
        filename: path.join(process.cwd(), "ecommerce.sqlite"),
      },
      useNullAsDefault: true,
    });
  }
  async addCartItem(cartId, item) {
    try {
      const cart = await this.knex(this.table)
        .where("id", "=", cartId)
        .select('*').first()
        if(cart){
        const newCartProducts = [JSON.parse(cart.productos), item]
            return await this.knex(this.table).where('id', '=', cartId).update({productos: JSON.stringify(newCartProducts)})
    }
        else {
            const items = []
            items.push(item)
            await this.addItem((new Cart(JSON.stringify(items))))
            return('ok')
        }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CarritosDaoSQL;
