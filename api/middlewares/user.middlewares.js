const authService = require("../../services/auth.service");

const isAuthenticated = (req, res, next) => {
    const token = req.headers.auth
    try {
        const user = authService.verifyToken(token)
        req.user = user.data
        next()
    } catch (error) {
        res.status(401).send(error)
    }   
}

const setAvatarFilename = (req, _res, next) => {
    if(req.file) {
        req.body.avatar = `http://${req.headers.host}/public/images/${req.file.filename}`
    }
    next()
}

module.exports = {isAuthenticated, setAvatarFilename};