const { NotFoundError } = require("../../utils/custom.errors")

const errorsController = (err, req, res, next) => {
    switch(err.name) {
        case 'CastError':
            res.status(404).json({error: 'Not Found'})
            break;
        case 'NotFoundError':
            res.status(404).send({error: 'Not Found'})
            break;
        default:
            res.status(500).send({error: err})
            break;
    }
}

module.exports = errorsController