const bcrypt = require("bcrypt");
const UserModel = require("../models/User")

const usersService = {}

usersService.findOne = async (key, value) => {
    try {
        const user = await UserModel.findOne({ [key]: value })
        return user;
    } catch (error) {
        throw error;
    }
}

usersService.create = async (userDto) => {
    try {
        userDto.password = bcrypt.hashSync(userDto.password, bcrypt.genSaltSync(10), null)
        const createdUser = await UserModel.create(userDto)
        return createdUser;
    } catch (error) {
        throw error;
    }
}

module.exports = usersService;