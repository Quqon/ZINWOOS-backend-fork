const { asyncWrap } = require('../utils/error');
const { orderService } = require('../services');

const addOrder = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items) {
        const error = new Error('KEY_ERROR');   
        error.statusCode = 400;
        throw error;
    }
    
    await orderService.addOrder(userId, items);

    res.status(200).json({ message:'Your order has been received' })
})

const getOrder = asyncWrap(async (req, res) => {
    const userId = req.user.id;

    const getOrder = await orderService.getOrder(userId)

    res.status(201).json({ getOrder });
})

module.exports = {
    addOrder,
    getOrder
}