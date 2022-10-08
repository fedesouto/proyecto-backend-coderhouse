const logger = require("../../utils/logger")

const sessionErrorHandler = (err, req, res, next) => {
    if(err) {
        logger.error(`Session related error: ${err}`)
        return res.status(400).json({error: err})
    }
    else {
        next()
    }
}

module.exports = {sessionErrorHandler}