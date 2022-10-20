const logger = require("../utils/logger");
const { mailNewOrder, mailNewUser } = require("../utils/mailer");

const notificationsService = {}

notificationsService.newOrder = async(order, user) => {
    const { name, email } = user;
    const { _id, products, total } = order;
    try {
        await mailNewOrder(_id, user, products, total);
        logger.info('orden procesada')
    } catch (error) {
        throw error;
    }
}
notificationsService.newUser = async(user) => {
    const { _id, username, name, address, age, email } = user;
    const data = { id: _id, username, address, age, email }
    try {
        await mailNewUser(data)
    } catch (error) {
        throw error;
    }
}

module.exports = notificationsService