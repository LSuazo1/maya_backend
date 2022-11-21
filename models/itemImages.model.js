const { db } = require('../config/db');
const { DataTypes } = require('sequelize');
const { Item } = require('./item.model');

const ItemImages = db.define('ItemImages', {
    idItemImages: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING
    },
    idItem: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'itemImages'
});


module.exports = { ItemImages };