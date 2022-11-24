const route = require('express').Router();
const { getSeveral, createOne, getOne, updateOne, deleteOne } = require('../controllers/users.controller');



route.get('/', getSeveral)
route.get('/:id', getOne)
route.post('/', createOne)
route.put('/:id', updateOne)
route.delete('/:id', deleteOne)


module.exports = route;
