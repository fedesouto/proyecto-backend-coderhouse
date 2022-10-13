const orderDto = require("../dtos/order.dto");
const OrderModel = require("../models/Order");
const cartsService = require("./carts.service");

const ordersService = {}

ordersService.submit = async (userId, cartId) => {
    try {
        const cart = await cartsService.findCartProducts(cartId)
        const newOrderDto = orderDto.create(userId, cart); 
        const createdOrder = await OrderModel.create(newOrderDto)
        return createdOrder.id;
    } catch (error) {
        throw error;
    }
}

ordersService.findByUserId = async (userId) => {
    try {
        const order = await OrderModel.find({user: userId}).exec()
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = ordersService;