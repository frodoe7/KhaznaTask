module.exports = {
    dbConnection : {
        dbName : process.env.ordersDBName,
        username : process.env.dbUsername,
        password : process.env.dbPassword,
        host : process.env.dbHost
    },
    services : {
        user : "http://localhost:3001/user",
        product : "http://localhost:3002/product"
    }
};