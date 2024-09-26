const cartRepository = require('../repositories/cartRepository');
const orderRepository = require('../repositories/orderRepository');

const addOrder = async (userId, items) => {
    let cartId = items.map(el => el.cartId);
    let itemId = items.map(el => el.itemId);
    let quantity = items.map(el => el.quantity);

    let tmp = "";
    items.map(el => tmp += `(${userId}, ${el.itemId}, ${el.quantity}),`)
    tmp = tmp.slice(0, -1);

    const checkCart = await cartRepository.checkCartById(userId, cartId)

    if (checkCart === '0') {
        const error = new Error('INVALID_CARTS')
        error.statusCode = 404;
        throw error;
    }

    await orderRepository.addOrderList(userId, tmp, cartId, itemId, quantity);
}

const getOrder = async (userId) => {
    const getOrderList = await orderRepository.getOrderList(userId);

    return getOrderList;
}

module.exports = {
    addOrder,
    getOrder
}