const express = require("express");
const cartRouter = require("./routes/cart.routes");
const productRouter = require("./routes/products.routes");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

const port = process.env.PORT | 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
