const logger = require("../utils/logger");
const { mailNewOrder, mailNewUser } = require("../utils/mailer");

const notificationsService = {}

notificationsService.newOrder = async(order, user) => {
    const { name, email, phone } = user;
    const { _id, products, total } = order;
    try {
        await mailNewOrder(_id, user, products, total);
        logger.info('orden procesada')
    } catch (error) {
        throw error;
    }
}
notificationsService.newUser = async(user) => {
    const { _id, username, name, address, age, phone } = user;
    const data = { id: _id, username, address, age, phone }
    try {
        await mailNewUser(data)
    } catch (error) {
        throw error;
    }
}

module.exports = notificationsService