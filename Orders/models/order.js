const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const order = connection.define("Order" , {
    productId : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    userEmail : {
        type : DataTypes.STRING,
        allowNull : false
    },
    cost : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : "pending"
    }
} , {
    timestamps : false
});

module.exports = order;