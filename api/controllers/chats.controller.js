const chatService = require("../../services/chat.service");
const logger = require("../../utils/logger");

const chatsController = async(socket, server) => {
    logger.info(`New connection - ${socket.id}`)

    socket.emit('init', await chatService.findAll())

    socket.on('new_message', async(new_chat) => {
        await chatService.addNew(new_chat)
        server.sockets.emit('update', await chatService.findAll())
    })

    socket.on('make_private', async(email) => {
        socket.emit(await chatService.findByEmail(email))
    })

}

module.exports = chatsController;