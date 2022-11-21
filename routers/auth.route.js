const {Router}=require('express');
const { confirmAccount, authenticate, changePassword, newPassword, verifyAccount } = require('../controllers/auth.controller');
const route=new Router();

//Confirma la cuenta cuenta
route.get('/confirmAccount/:token',confirmAccount);
route.post('/',authenticate);


//Recuperar Contrasenia
route.post('/changePassword',changePassword);

route.get('/changePassword/:token',verifyAccount);
route.post('/savePassword/:token',newPassword);


module.exports = route;