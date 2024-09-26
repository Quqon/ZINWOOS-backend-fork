const express = require('express');

const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const likeRouter = require('./likeRouter');
const fileRouter = require('./FileRouter');
const paymentRouter = require('./paymentRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/likes', likeRouter);
router.use('/files', fileRouter);
router.use('/payment', paymentRouter);

module.exports = router;