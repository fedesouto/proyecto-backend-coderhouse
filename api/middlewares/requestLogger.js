const logger = require('../../utils/logger')

const requestLogger = (req, _res, next) => {
    logger.info(`${req.method} - ${req.originalUrl}`)
    next()
}

const requestWarnLogger = (req, _res, next) => {
    logger.warn(`Cannot GET ${req.originalUrl}`)
    next()
}

module.exports = {requestLogger, requestWarnLogger}