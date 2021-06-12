const express = require('express');
const app = express();
const WebSocket = require('ws');
const { changeBalance } = require('./controllers/user');
const { verify } = require("jsonwebtoken");
const { connect, close } = require('./connection');

const ws = new WebSocket.Server({ port: 3030 });

app.use(express.json());

app.use(require("./routes/user"));

ws.on("connection", (client) => {
    client.on("message", (data) => {
        data = JSON.parse(data);
        if (data.message == "changeBalance" && data.internalSecretCode == process.env.internalSecretKey) {
            let token = data.token;
            if (!token) {
                response.status(401).send({ success: false, error: "Invalid token" });
                return;
            }

            verify(token, process.env.JWTSecretKey, async (err, decoded) => {
                if (err) {
                    response.status(401).send({ success: false, error: "Invalid token" });
                    return;
                }

                changeBalance(data.email, data.amount);
            });
        }
    })
})

process.on("beforeExit", () => {
    close();
});

app.listen(3001, async () => {
    let isConnected = await connect();
    if (!isConnected) {
        console.log("Issue with the users DB connection.");
        process.exit();
    }
    console.log("User Service Started");
});