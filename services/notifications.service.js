const { mailNewOrder } = require("../utils/mailer");

const notificationsService = {}

notificationsService.newOrder = async (order, user) => {
    const {name, email, phone} = user;
    const {_id, products, total} = order;
    console.log(order)
    try {
        await mailNewOrder( _id, user, products, total);
        console.log('orden procesada')
    } catch (error) {
        
    }

}

module.exports = notificationsService