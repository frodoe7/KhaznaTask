const bcrypt = require('bcrypt');
var { security } = require('../config');

function hashify(password , cb)
{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            cb(hash);
        });
    });
}

function checkHash(password , hash , cb)
{
    bcrypt.compare(password, hash, function(err, result) {
        cb(result);
    });
}

module.exports = { hashify , checkHash }