var connection = require('../connect');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../rest'); //seharusnya nama file res.js
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller utk register
exports.registrasi = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tgl_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

//connection ngecek di var table line 20. jika blm terdaftar melakukan insert into (meniympan data ke table user) dengan data dari post    
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        } else{
            if(rows.length == 0){ //jika kosong maka dilakukan inser into
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    } else{
                        response.ok("Berhasil menambahkan data user terbaru", res);
                    }
                });
            } else { //jika sudah ada
                response.ok("Email sudah ada!", res);
            }
        }
    })
}