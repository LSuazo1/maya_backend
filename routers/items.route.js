const { Router } = require('express');
const imageController = require('../controllers/images.controller');
const {getOneImage}=require('../controllers/items.controller');
const route = new Router();


//Area privada checkAuth es para autenticar el token
route.post('/', imageController.upload, imageController.uploadImage);


route.get('/showImage', getOneImage);


route.get('/getSeveral',getSeveral);
module.exports = route;