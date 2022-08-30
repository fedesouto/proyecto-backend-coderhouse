const express = require("express");
const cartRouter = require("./routes/cart.routes");
const productRouter = require("./routes/products.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { secret, server_mode } = require("./config");
const session = require("./auth/session");
const passport = require("./auth/passport");
const sessionRouter = require("./routes/session.routes");
const {
  requestWarnLogger,
  requestLogger,
} = require("./middlewares/requestLogger");
const cluster = require("cluster");
const logger = require("./utils/logger");
const cantCpus = require("os").cpus().length;

if (server_mode === "cluster" && cluster.isPrimary) {
  logger.info(`Primary: ${process.pid}`);
  for (let i = 0; i < cantCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    logger.info(`Cluster ${worker.process.pid} has exited.`);
  });
} else {
  const app = express();

  app.use(cors({ credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(secret));
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/public", express.static("public"));
  app.use(requestLogger);

  app.use("/api/productos", productRouter);
  app.use("/api/carritos", cartRouter);
  app.use("/api/session", sessionRouter);

  app.get("*", requestWarnLogger, (req, res) => {
    res.status(404).send("Not Found");
  });

  const port = process.env.PORT || 8080;

  app.listen(port, () =>
    console.log(`Server listening on port ${port} - (PID ${process.pid})`)
  );
}
