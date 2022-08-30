const twilio = require('twilio')
const { twilio_user, twilio_token, twilio_phone, admin_phone, twilio_wapp } = require('../config')

const cliente = twilio(twilio_user, twilio_token)

const sendSMSToUser = async (phone) => {
    try {
        const status = await cliente.messages.create({
            body: "Su pedido en CHBE fue procesado.",
            from: twilio_phone,
            to: phone
        })
        console.log('Mensaje enviado al cliente', status)
    } catch (error) {
        console.log(error)
    }
}

const sendWhatsappToAdmin = async (data) => {
try {
    const status = await cliente.messages.create({
        body: data,
        from: twilio_wapp,
        to: `whatsapp:${admin_phone}`
    })
    console.log('Mensaje enviado', status)
} catch (error) {
    console.log(error)
}
}

module.exports = {sendSMSToUser, sendWhatsappToAdmin}