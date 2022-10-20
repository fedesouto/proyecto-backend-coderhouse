const ordersService = require("../../services/orders.service")

const ordersController = {}

ordersController.getByUserId = async (req, res, next) => {
    const userId = req.user._id

    try {
        const orders = await ordersService.findByUserId(userId)
        res.json(orders)
    } catch (error) {
        next(error)
    }
}

module.exports = ordersController;