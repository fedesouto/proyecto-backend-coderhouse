const { Router } = require('express')
const { join } = require('path')
const miscController = require('../controllers/misc.controller')

const dashboardRouter = Router()

dashboardRouter.get('/', (req, res, next) => {
    res.sendFile(join(process.cwd(), 'public', 'views', 'index.html'))

})

dashboardRouter.get('/chat', (req, res, next) => {
    res.sendFile(join(process.cwd(), 'public', 'views', 'chat', 'index.html'))
})

dashboardRouter.get('/info', miscController.getServerConfig)

/* dashboardRouter.get('/orders', (req, res, next) => {
    res.sendFile(join(process.cwd(), 'public', 'views', 'orders', 'index.html'))
})

dashboardRouter.get('/customers', (req, res, next) => {
    res.sendFile(join(process.cwd(), 'public', 'views', 'customers', 'index.html'))
})

dashboardRouter.get('/products', (req, res, next) => {
    res.sendFile(join(process.cwd(), 'public', 'views', 'products', 'index.html'))
}) */


module.exports = dashboardRouter;