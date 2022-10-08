const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    name: String,
    address: String,
    age: Number,
    phone: String,
    avatar: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"},
    cartId: String
})

const UserModel = model("User", UserSchema)



module.exports = UserModel