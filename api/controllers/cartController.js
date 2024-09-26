const { cartService } = require('../services');
const { asyncWrap } = require('../utils/error');
let cartData = {};

const addCart = asyncWrap(async (req, res) => {
    const userId = req.user[0].dataValues.id
    const { itemId, quantity, optionId } = req.body;

    if (!itemId || !quantity) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (quantity <= 0) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await cartService.addCart(userId, itemId, quantity, optionId)

    res.status(201).json({ message: 'Item added successfully' })
})

const getCart = asyncWrap(async (req, res) => {
    const userId = req.user[0].dataValues.id;
    const { limit, offset } = req.query;

    if (!limit || !offset) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (+limit > 50) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    const cartList = await cartService.getCart(+userId, +limit, +offset);

    res.status(200).json({ cartList });
})

const getNonCart = asyncWrap(async (req, res) => {
    const sessionId = req.headers['authorization'];

    if (!cartData[sessionId]) {
        cartData[sessionId] = [];
    }
    const cart = cartData[sessionId];

    res.json({ cart });
})

const addNonCart = asyncWrap(async (req, res) => {
    try {
        const { itemId, quantity, optionId, itemName, detail_image, id, checkbox, price } = req.body;
        let option;
        const sessionId = req.headers['authorization'];

        if (optionId) {
            option = await cartService.getNonCartOption(optionId);
        }

        const result = option ? option : null;

        if (!cartData[sessionId]) {
            cartData[sessionId] = [];
        }

        const data = {
            itemId: itemId,
            quantity: quantity,
            optionId: optionId,
            itemName: itemName,
            detail_image: detail_image,
            id: id,
            checkbox: checkbox,
            optionName: result && result[0] && result[0].dataValues ? result[0].dataValues.name : null,
            price: price
        }

        cartData[sessionId].push(data);

        res.status(200).json({ cart: cartData[sessionId] });
    } catch (error) {
        console.error('error: ', error)
    }
});

const delNonCart = asyncWrap(async (req, res) => {
    try {
        const { cartId } = req.query;
        const sessionId = req.headers['authorization'];

        if (!cartData[sessionId]) {
            return res.status(404).json({ message: 'No cart data found for this session' });
        }

        cartData[sessionId] = cartData[sessionId].filter(item => item.id !== cartId);

        res.status(200).json({ message: 'DELETE_SUCCESS', cartList: cartData[sessionId] })
    } catch (error) {
        console.error('error:', error)
    }

})

const plusQuantity = asyncWrap(async (req, res) => {
    const userId = req.user[0].dataValues.id;
    const { cartId, quantity } = req.body;

    if (!cartId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (quantity <= 0) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const cartList = await cartService.plusQuantity(userId, cartId);

    res.status(204).json({ cartList })
})

const minusQuantity = asyncWrap(async (req, res) => {
    const userId = req.user[0].dataValues.id;
    const { cartId, quantity } = req.body;

    if (!cartId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (quantity <= 0) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const cartList = await cartService.minusQuantity(userId, cartId)

    res.status(204).json({ cartList })
})

const deleteCart = asyncWrap(async (req, res) => {
    const userId = req.user[0].dataValues.id;
    const { cartId } = req.query;

    if (!cartId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await cartService.deleteCart(+userId, cartId)

    res.status(200).json({ message: 'DELETE_SUCCESS' })
})

module.exports = {
    addCart,
    getCart,
    plusQuantity,
    minusQuantity,
    deleteCart,
    getNonCart,
    addNonCart,
    delNonCart
}