const UserModel = require("../models/User");

const usersService = {};

usersService.findOne = async(key, value) => {
    try {
        const user = await UserModel.findOne({
            [key]: value
        });
        return user;
    } catch (error) {
        throw error;
    }
};

usersService.create = async(createUserDto) => {
    try {
        const createdUser = await UserModel.create(createUserDto);
        return createdUser;
    } catch (error) {
        throw error;
    }
};

usersService.updateCurrentCart = async(userId, cartId) => {
    try {
        if (!cartId) {
            await UserModel.findByIdAndUpdate(userId, { $unset: { currentCart: 1 } });
        } else {
            await UserModel.findByIdAndUpdate(userId, { currentCart: cartId });
        }
    } catch (error) {
        throw error;
    }
};

usersService.setNewOrder = async(userId, orderId) => {
    try {
        const user = await UserModel.findById(userId)
        user.orders.push(orderId)
        const updatedUser = await user.save()
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = usersService;