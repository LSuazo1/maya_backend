const {Router}=require('express');
const { createOne } = require('../controllers/users.controller');
const route=new Router();



route.post('/',createOne);

module.exports = route;