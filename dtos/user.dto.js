const userDto = {}

userDto.create = (user) => {
    return {
        _id : user._id,
        username: user.username,
        name: user.name,
        address: user.address,
        age: user.age,
        avatar: user.avatar,
        orders: user.orders,
        currentCart: user.currentCart,
        email: user.email,
        admin: user.admin 
    }
}

module.exports = userDto;