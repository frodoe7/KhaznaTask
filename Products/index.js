const express = require('express');
const app = express();
const { connect , close } = require('./connection');

app.use(express.json());

app.use(require("./routes/product"));

process.on("beforeExit" , () => {
    close();
});

app.listen(3002 , async () => {
    let isConnected = await connect();
    if (!isConnected)
    {
        console.log("Issue with the products DB connection.");
        process.exit();
    }
    console.log("Product Service Started");
});