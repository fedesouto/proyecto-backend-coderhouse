const ContenedorSQL = require("../../contenedores/ContenedorSQL");
const path = require('path')


class ProductosDaoSQL extends ContenedorSQL {
  constructor() {
    super("productos", {
      client: "sqlite3",
      connection: {
        filename: path.join(process.cwd(), 'ecommerce.sqlite'),
      },
      useNullAsDefault: true,
    });
  }
}



module.exports = ProductosDaoSQL;
