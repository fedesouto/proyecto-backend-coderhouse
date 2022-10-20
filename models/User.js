const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    name: String,
    address: String,
    age: Number,
    email: String,
    avatar: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    currentCart: { type: Schema.Types.ObjectId, ref: "Cart" },
    admin: { type: Boolean, default: false }
})

const UserModel = model("User", UserSchema)



module.exports = UserModel