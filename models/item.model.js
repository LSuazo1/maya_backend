const { db } = require('../config/db');
const { DataTypes } = require('sequelize');
const { ItemImages } = require('./itemImages.model');

const Item = db.define('Item', {
    idItem: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.BOOLEAN
    },
    availability: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    idUser: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'item'
});



Item.hasMany(ItemImages, {
    foreignKey: 'idItem',
    sourceKey: 'idItem'
});

ImagenesProducto.belongsTo(Item, {
    foreignKey: 'idItem',
    targetId: 'idItem'
});

module.exports = { Item };