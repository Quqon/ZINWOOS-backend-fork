const userRepository = require('../repositories/userRepository');
const cartRepository = require('../repositories/cartRepository');

const addCart = async (userId, itemId, quantity, optionId) => {

    const user = await userRepository.getUserById(userId);
    const check = await cartRepository.checkCart(userId, itemId, optionId);

    if (!user) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }

    if (check !== false) {
        return await cartRepository.updateCart(userId, itemId, quantity, optionId);
    }

    return await cartRepository.createCartList(userId, itemId, quantity, optionId);
}

const getCart = async (userId, limit, offset) => {
    return await cartRepository.getAllCart(userId, limit, offset);
}

const getNonCart = async (itemId) => {
    return await cartRepository.getNonCart(itemId);
}

const getNonCartOption = async (optionId) => {
    return await cartRepository.getNonCartOption(optionId);
}

const plusQuantity = async (userId, cartId) => {
    const match = await cartRepository.checkCartById(userId, cartId);

    if (match === false) {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }

    return await cartRepository.plusQuantity(cartId)
}

const minusQuantity = async (userId, cartId) => {
    const match = await cartRepository.checkCartById(userId, cartId);

    if (match === '0') {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }

    return await cartRepository.minusQuantity(cartId)
}

const deleteCart = async (userId, cartId) => {

    const match = await cartRepository.checkCartById(userId, cartId);

    if (match === false) {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }

    return await cartRepository.deleteCart(userId, cartId);
}


module.exports = {
    addCart,
    getCart,
    getNonCart,
    plusQuantity,
    minusQuantity,
    deleteCart,
    getNonCartOption
}