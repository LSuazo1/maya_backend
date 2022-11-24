const route = require('express').Router()
const imageController = require('../controllers/images.controller');
const { getOneImage, getSeveral, createOne } = require('../controllers/items.controller');


route.post('/', imageController.upload, imageController.uploadImage);
// route.post('/', createOne)
route.get('/:id', getOneImage);
route.get('/', getSeveral);



module.exports = route;
