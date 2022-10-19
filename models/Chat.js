const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
    email: { type: String },
    type: { type: String, enum: ['user', 'system'] },
    message: { type: String }
})

const ChatModel = model('Chat', ChatSchema)

module.exports = ChatModel;