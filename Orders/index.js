const express = require('express');
const app = express();
const { connect , close } = require('./connection');

app.use(express.json());

app.use(require("./routes/order"));

process.on("beforeExit" , () => {
    close();
});

app.listen(3003 , async () => {
    let isConnected = await connect();
    if (!isConnected)
    {
        console.log("Issue with the orders DB connection.");
        process.exit();
    }
    console.log("Order Service Started");
});