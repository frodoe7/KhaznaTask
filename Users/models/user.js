const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const user = connection.define("customer" , {
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        primaryKey : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    balance : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    maxAllowed : {
        type : DataTypes.NUMBER,
        allowNull : false
    }
} , {
    timestamps : false
});

module.exports = user;