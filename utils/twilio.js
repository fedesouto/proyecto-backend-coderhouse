const twilio = require('twilio')
const { twilio_user, twilio_token, twilio_phone, admin_phone, twilio_wapp } = require('../config')
const logger = require('./logger')

const cliente = twilio(twilio_user, twilio_token)

const sendSMSToUser = async (phone) => {
    try {
        const status = await cliente.messages.create({
            body: "Su pedido en CHBE fue procesado.",
            from: twilio_phone,
            to: phone
        })
        logger.info('Mensaje enviado al cliente', status)
    } catch (error) {
        logger.error(`Error twilio: ${error}`)
    }
}

const sendWhatsappToAdmin = async (data) => {
try {
    const status = await cliente.messages.create({
        body: data,
        from: twilio_wapp,
        to: `whatsapp:${admin_phone}`
    })
    logger.info('Mensaje enviado al administrador', status)
} catch (error) {
    logger.error(`Error twilio: ${error}`)
}
}

module.exports = {sendSMSToUser, sendWhatsappToAdmin}