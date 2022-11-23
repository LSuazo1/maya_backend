const { Router } = require('express');
const imageController = require('../controllers/images.controller');
const { getOneImage, getSeveral, createOne } = require('../controllers/items.controller');
const route = new Router();

//Area privada checkAuth es para autenticar el token
// route.post('/', imageController.upload, imageController.uploadImage);
route.post('/', imageController.upload, imageController.uploadImage);
route.get('/:id', getOneImage);
route.get('/', getSeveral);


module.exports = route;
