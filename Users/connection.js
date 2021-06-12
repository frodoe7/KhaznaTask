const { Sequelize } = require('sequelize');
const { dbConnection } = require('./config');

const connection = new Sequelize(dbConnection.dbName, dbConnection.username, dbConnection.password , {
    host: dbConnection.host,
    dialect: 'mysql'
});

async function connect()
{
    try
    {
        await connection.authenticate();
        return true;
    }
    catch(err)
    {
        return false;
    }
}

async function close()
{
    await connection.close();
}

module.exports = { connect , close , connection };