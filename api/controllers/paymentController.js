const { asyncWrap } = require('../utils/error');
const paymentService = require('../services/paymentService');

const getUserById = asyncWrap(async (req, res) => {
    try {
        const user = req.user;
        const userId = user[0].dataValues.id;

        const result = await paymentService.getUserById(userId);

        res.status(201).json({ result });
    } catch (error) {
        console.error(error)
    }
});

module.exports = { getUserById };