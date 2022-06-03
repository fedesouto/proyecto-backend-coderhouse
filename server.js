const express = require("express");
const cartRouter = require("./routes/cart.routes");
const productRouter = require("./routes/products.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/productos", productRouter);
app.use("/carrito", cartRouter);

const port = process.env.PORT | 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
