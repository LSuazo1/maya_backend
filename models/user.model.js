const { db } = require('../config/db');
const { DataTypes } = require('sequelize');


const User = db.define('user', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.STRING
    },
    municipality: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'user'
});


module.exports = { User };