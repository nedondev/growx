'user strict';

var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];

//local mysql db connection
var connection = mysql.createConnection({
    host    : config.host,
    user    : config.username,
    password: config.password,
    database: config.database
});

connection.connect(function(err){
    if (err) throw err;
});

module.exports = connection;
