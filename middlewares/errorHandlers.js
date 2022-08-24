const sessionErrorHandler = (err, req, res, next) => {
    if(err) return res.status(400).json({error: err})
    else {
        next()
    }
}

module.exports = {sessionErrorHandler}