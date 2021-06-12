const order = require("../models/order");

async function createOrder(cost,productId,userEmail)
{
    return await order.create({ cost , productId , userEmail });
}

async function cancelOrder(id)
{
    let _order = await getOrder(id);
    _order.status = "cancelled";
    _order.save();
}

async function deliverOrder(id)
{
    let _order = await getOrder(id);
    _order.status = "delivered";
    _order.save();
}

async function getOrder(id)
{
    return await order.findOne({ where : {
        id
    } });
}

async function getOrderByIdAndEmail(userEmail,id)
{
    return await order.findOne({ where : {
        userEmail , id
    } });
}

module.exports = { createOrder , cancelOrder , deliverOrder , getOrderByIdAndEmail };