const errorsController = (err, _req, res, _next) => {
    switch (err.name) {
        case 'CastError':
            res.status(400).json({ error: 'Bad request' })
            break;
        case 'NotFoundError':
            res.status(404).json({ error: 'Not Found' })
            break;
        default:
            res.status(500).json({ error: err })
            break;
    }
}

module.exports = errorsController