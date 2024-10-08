const express = require('express');
const { userController } = require('../controllers')

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/admin', userController.getAdmin);

module.exports = userRouter;