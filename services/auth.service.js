const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret } = require('../config');
const usersService = require('./users.service');
const userDto = require('../dtos/user.dto');

const authService = {}

authService.generateToken = (user) => {
    const token = jwt.sign({ data: user }, secret, { expiresIn: '24h' });
    return token;
}

authService.verifyToken = (token) => {
    return jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            throw new Error('Invalid or expired token.')
        }
        else {
            return decoded
        }
    })
}

authService.signIn = async (username, password) => {
    const user = await usersService.findOne('username', username)
    if (!user) {
        throw new Error('Invalid credentials.')
    }
    else {
        const validPass = bcrypt.compareSync(password, user?.password)
        if (validPass) {
            const loginUserDto = userDto.create(user)
            const token = authService.generateToken(loginUserDto)
            return {token, user: loginUserDto}
        }
        else {
            throw new Error('Invalid credentials.')
        }
    }
}

authService.signUp = async (createUserDto) => {
    try {
        createUserDto.password = bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync(10), null)
        const createdUser = await usersService.create(createUserDto)
        const token = authService.generateToken(createdUser)
        const createdUserDto = userDto.create(createdUser)
        return {token, createdUserDto}
    } catch (error) {
        throw error;
    }
}

module.exports = authService;