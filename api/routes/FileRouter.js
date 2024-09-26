const express = require('express');
const fileRouter = express.Router()
const fileController = require('../controllers/fileController');
const upload = require('../utils/upload');

fileRouter.post('/itemImageUpload', upload.single('file'), fileController.uploadItemImage);
fileRouter.post('/itemUpload', upload.single('file'), fileController.uploadItem);

module.exports = fileRouter