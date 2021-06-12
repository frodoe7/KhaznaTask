const express = require("express");
var router = express.Router();
const { services } = require("../config");
const WebSocket = require('ws');
const ws = new WebSocket("http://localhost:3030");
const { get } = require('axios').default;
const { cancelOrder, createOrder, deliverOrder, getOrderByIdAndEmail } = require("../controllers/order");
const { verify } = require("jsonwebtoken");

router.post("/order/place/:productId", async (request, response) => {
    let token = request.headers.token;

    if (!token) {
        response.status(401).send({ success: false, error: "Invalid token" });
        return;
    }

    verify(token, process.env.JWTSecretKey, async (err, decoded) => {
        if (err) {
            response.status(401).send({ success: false, error: "Invalid token" });
            return;
        }

        let email = decoded.email;
        let productId = request.params.productId;

        get(services.user + "/me", {
            headers: { token }
        }).then(profile => {
            get(services.product + "/" + productId, {
                headers: { token }
            }).then(async (data) => {
                let product = data.data.data;
                if (profile.data.balance < product.price) {
                    response.status(400).send({ success: false, error: "Insufficient balance" });
                    return;
                }

                let order = await createOrder(product.price, product.id, email);
                if (order) {
                    ws.send(JSON.stringify({
                        message: "changeBalance",
                        amount: (order.toJSON().cost * -1),
                        email,
                        internalSecretCode: process.env.internalSecretKey,
                        token
                    }));

                    response.status(200).send({ success: true });
                    return;
                }
                else {
                    response.status(400).send({ success: false, error: "Error in requesting the order" });
                    return;
                }
            }).catch(err => {
                response.status(err.response.status).send(err);
                return;
            })
        }).catch(err => {
            response.status(err.response.status).send(err);
            return;
        })
    });
});

router.post("/order/cancel/:id", async (request, response) => {
    let token = request.headers.token;

    if (!token) {
        response.status(401).send({ success: false, error: "Invalid token" });
        return;
    }

    verify(token, process.env.JWTSecretKey, async (err, decoded) => {
        if (err) {
            response.status(401).send({ success: false, error: "Invalid token" });
            return;
        }

        let email = decoded.email;
        let id = request.params.id;
        let orderExist = await getOrderByIdAndEmail(email, id);
        if (!orderExist) {
            response.status(400).send({ success: false, error: "This order is not exist" });
            return;
        }

        if (orderExist.toJSON().status != "pending") {
            response.status(400).send({ success: false, error: "This order is already " + orderExist.toJSON().status });
            return;
        }

        await cancelOrder(id);
        ws.send(JSON.stringify({
            message: "changeBalance",
            amount: (orderExist.toJSON().cost),
            email,
            internalSecretCode: process.env.internalSecretKey,
            token
        }));

        response.status(200).send({ success: true });
        return;
    });
});

router.post("/order/deliver/:id", async (request, response) => {
    let token = request.headers.token;

    if (!token) {
        response.status(401).send({ success: false, error: "Invalid token" });
        return;
    }

    verify(token, process.env.JWTSecretKey, async (err, decoded) => {
        if (err) {
            response.status(401).send({ success: false, error: "Invalid token" });
            return;
        }

        let email = decoded.email;
        let id = request.params.id;
        let orderExist = await getOrderByIdAndEmail(email, id);
        if (!orderExist) {
            response.status(400).send({ success: false, error: "This order is not exist" });
            return;
        }

        if (orderExist.toJSON().status != "pending") {
            response.status(400).send({ success: false, error: "This order is already " + orderExist.toJSON().status });
            return;
        }

        await deliverOrder(id);
        response.status(200).send({ success: true });
        return;
    });
});

module.exports = router;