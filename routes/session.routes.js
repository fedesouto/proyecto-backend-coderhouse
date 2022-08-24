const {Router} = require('express')
const passport = require('../auth/passport')
const { sessionErrorHandler } = require('../middlewares/errorHandlers')

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), sessionErrorHandler, (req, res, next) => {
    const {avatar, name, username, address, phone, age} = req.user
    res.json({avatar, name, username, address, phone, age})
})

sessionRouter.post('/signup',passport.authenticate('signup'), sessionErrorHandler, (err, req, res, next) =>{
    const {avatar, name, username, address, phone, age} = req.user
    res.json({avatar, name, username, address, phone, age})
})

sessionRouter.get('/user', (req, res, next) => {
    if(req.user) {
        const {avatar, name, username, address, phone, age} = req.user
        res.json({avatar, name, username, address, phone, age})
    }
    else res.send('no esta logueado')
})

sessionRouter.post('/logout', (req, res, next) => {
    req.logout((error) => {
        if(error) res.status(500).send(`Error: ${error}`)
        else{
            req.session.destroy()
            res.send('success')
        }
    })
})
module.exports = sessionRouter