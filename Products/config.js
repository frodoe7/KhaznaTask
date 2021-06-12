module.exports = {
    dbConnection : {
        dbName : process.env.productsDBName,
        username : process.env.dbUsername,
        password : process.env.dbPassword,
        host : process.env.dbHost
    },
    services : {
        user : "http://localhost:3001/user"
    }
};