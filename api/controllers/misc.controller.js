const { port, server_mode } = require("../../config")

const miscController = {}

miscController.getServerConfig = (_req, res, _next) => {
    res.json({
        port: port,
        mode: server_mode,
        os: process.platform ,
        nodeVersion: process.version,
        rss: process.memoryUsage.rss(),
        execPath: process.execPath,
        processId: process.pid
    })
}

module.exports = miscController;