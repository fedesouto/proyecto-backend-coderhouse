const express = require("express");
const cartRouter = require("./routes/cart.routes");
const productRouter = require("./routes/products.routes");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { secret } = require("./config");
const session = require("./auth/session");
const passport = require("./auth/passport");
const sessionRouter = require("./routes/session.routes");

const app = express();

app.use(cors({credentials: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secret))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static('public'))



app.use("/api/productos", productRouter);
app.use("/api/carritos", cartRouter);
app.use("/api/session", sessionRouter)

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
