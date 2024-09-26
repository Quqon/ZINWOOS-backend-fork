const express = require('express');
const { itemController } = require('../controllers');
const itemRouter = express.Router();

itemRouter.get('/main', itemController.getMainList);
itemRouter.get('/sub', itemController.getSubList);
itemRouter.get('/new', itemController.getNewList);
itemRouter.get('/all', itemController.getAll);
itemRouter.get('/:id', itemController.getItemById);
itemRouter.delete('/:itemName', itemController.deleteItem);
itemRouter.put('/:updateName', itemController.updateItem);

module.exports = itemRouter;