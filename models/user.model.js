const { DataTypes } = require('sequelize');
const { db } = require('../config/db');
const { Item } = require('./item.model');

const User = db.define('user', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    department: {
        type: DataTypes.STRING,
    },
    municipality: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.BOOLEAN,
    },
    password: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'user',
});

User.hasMany(Item, {
    foreignKey: 'idUser',
    sourceKey: 'idUser',
});

Item.belongsTo(User, {
    foreignKey: 'idUser',
    sourceKey: 'idUser',
});

module.exports = { User };
