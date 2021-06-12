const { Op } = require("sequelize");
const product = require("../models/product");

async function fetchProductsByMaxAllowed(maxAllowed) {
    return await product.findAll({
        where: {
            price: {
                [Op.lte]: maxAllowed
            }
        }
    });
}

async function fetchProduct(id) {
    return await product.findOne({ where : {
        id
    } });
}

module.exports = { fetchProductsByMaxAllowed, fetchProduct };