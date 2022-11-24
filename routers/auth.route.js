const route = require('express').Router()
const { confirmAccount, signIn, changePassword, newPassword, verifyAccount } = require('../controllers/auth.controller');


route.post('/signin', signIn);
route.get('/confirmAccount/:token', confirmAccount); // Confirm the account
route.post('/changePassword', changePassword); // Change password
route.get('/changePassword/:token', verifyAccount);
route.post('/savePassword/:token', newPassword);


module.exports = route;
