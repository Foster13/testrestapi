'use strict';

var response = require('./rest');
var connection = require('./connect');

exports.index = function(req, res){
    response.ok("Aplikasi REST API Berjalan",res)
};

//tampil semua data mhs
exports.tampilsemuamhs = function(req, res){
    connection.query('SELECT * FROM tes', function(error, rows, fields){
        if(error){
            connection.log(error);
        } else{
            response.ok(rows, res)
        }
    });
};