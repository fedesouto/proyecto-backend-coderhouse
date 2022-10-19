const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");


const cartRouter = require("./api/routes/cart.routes");
const productRouter = require("./api/routes/products.routes");
const cors = require("cors");
const { server_mode, mongodbUri } = require("./config");
const sessionRouter = require("./api/routes/session.routes");
const {
    requestWarnLogger,
    requestLogger,
} = require("./api/middlewares/requestLogger");
const cluster = require("cluster");
const logger = require("./utils/logger");
const { default: mongoose } = require("mongoose");
const { isAuthenticated } = require("./api/middlewares/user.middlewares");
const chatsController = require("./api/controllers/chats.controller");
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
    const httpServer = new HttpServer(app)
    const ioServer = new IOServer(httpServer)



    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use("/public", express.static("public"));
    app.use(requestLogger);

    app.use("/api/session", sessionRouter);

    app.use(isAuthenticated)
    app.use("/api/productos", productRouter);
    app.use("/api/carritos", cartRouter);

    app.get("*", requestWarnLogger, (req, res) => {
        res.status(404).send("Not Found");
    });

    const port = process.env.PORT || 8080;


    ioServer.on('connection', async(socket) => chatsController(socket, ioServer))

    mongoose.connect(mongodbUri).then(value => {
        logger.info('Connected to DB!')
        httpServer.listen(port, () =>
            logger.info(`Server listening on port ${port} - (PID ${process.pid})`)
        );
    })
}