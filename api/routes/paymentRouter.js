const express = require('express');
const paymentRouter = express.Router();
const { loginRequired } = require('../utils/auth')

const paymentController = require('../controllers/paymentController');

paymentRouter.post('', loginRequired, paymentController.getUserById);

module.exports = paymentRouter;