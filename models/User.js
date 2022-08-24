const uniqid = require('uniqid')

class User {
    constructor({username, password, name, address, age, phone, avatar}){
        this.id = uniqid()
        this.timestamp = Date.now()
        this.username = username
        this.password = password
        this.name = name
        this.address = address
        this. age = age
        this.phone = phone
        this.avatar = avatar
    }
}

module.exports = User