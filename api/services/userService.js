require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/userRepository')
const validator = require('../utils/validator')

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        algorithm: process.env.ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const generateAdminAccessToken = (user) => {
    if (user.role === 'admin') {
        return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            algorithm: process.env.ALGORITHM,
            expiresIn: process.env.JWT_EXPIRES_IN
        })
    }
    return null
}

const hashPassword = async (password) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    return await bcrypt.hash(password, salt)
}

const getUserById = async (id) => {
    const result = await userRepository.getUserById(id)

    return result;
}

const signUp = async (name, email, password, address, phoneNumber) => {
    validator.validateEmail(email);
    validator.validatePassword(password);

    const checkOverlap = await userRepository.getUserByEmail(email)

    if (checkOverlap) {
        const error = new Error('INVALID_USER')
        error.statusCode = 401;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    return await userRepository.createUser(name, email, hashedPassword, address, phoneNumber)
}

const signIn = async (email, password) => {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user);
    const adminAccessToken = generateAdminAccessToken(user);

    const tokens = {
        accessToken,
        ...(adminAccessToken && { adminAccessToken })
    }

    return tokens;
}

const getAdmin = token => {
    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        return decodedPayload;
    } catch (err) {
        throw new Error('Invalid token');
    }
}


module.exports = {
    signUp,
    signIn,
    getUserById,
    getAdmin
}