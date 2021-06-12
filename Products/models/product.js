const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const product = connection.define("Product" , {
    id : {
        type : DataTypes.NUMBER,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    category : {
        type : DataTypes.STRING,
        allowNull : false
    },
    brand : {
        type : DataTypes.STRING,
        allowNull : false
    },
    price : {
        type : DataTypes.NUMBER,
        allowNull : false
    }
} , {
    timestamps : false
});

module.exports = product;