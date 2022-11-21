const {Router}=require('express');
const { createOne } = require('../controllers/user.controller');
const route=new Router();



route.post('/save',createOne);

module.exports = route;