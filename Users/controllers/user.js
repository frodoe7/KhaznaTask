const user = require("../models/user");

async function createUser(name,email,password,balance,maxAllowed)
{
    return await user.create({name,email,password,balance,maxAllowed});
}

async function changeBalance(email , change)
{
    let profile = await getProfile(email);
    profile.balance += change;
    profile.save();
}

async function getProfile(email)
{
    return await user.findOne({ where : {
        email
    } });
}

module.exports = { createUser , getProfile , changeBalance };