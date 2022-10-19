const ChatModel = require("../models/Chat")

const chatService = {}

chatService.findAll = async() => {
    try {
        const chats = await ChatModel.find().exec()
        return chats;
    } catch (error) {
        throw error;
    }
}

chatService.addNew = async(createChatDto) => {
    try {
        const createdChat = await ChatModel.create(createChatDto)
        return createdChat;
    } catch (error) {
        throw error;
    }
}

chatService.findByEmail = async(email) => {
    try {
        const chats = await ChatModel.find({ email: email }).exec()
        return chats;
    } catch (error) {
        throw error;
    }
}

module.exports = chatService;