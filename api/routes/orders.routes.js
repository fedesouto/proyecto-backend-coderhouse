const {Router} = require('express')
const ordersController = require('../controllers/orders.controller')

const ordersRouter = Router()

ordersRouter.get('/', ordersController.getByUserId)

module.exports = ordersRouter;