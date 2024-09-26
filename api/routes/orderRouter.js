const express = require('express');
const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const orderRouter = express.Router();

orderRouter.get('', loginRequired, orderController.getOrder);
orderRouter.post('', loginRequired, orderController.addOrder);

module.exports = orderRouter;