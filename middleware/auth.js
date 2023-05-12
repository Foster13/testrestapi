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

//controller utk login
exports.login = function(req, res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }

//ketika login benar, lalu cek 1 dan jwt buat token yg jangka waktu 1000s
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        } else{
            if(rows.length == 1){ //buat token dng jwt yg dl 1000s
                var token = jwt.sign({rows}, config.secret, {expiresIn: 1000});
                id_user = rows[0].id;

                var data = { //tampung data
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address() //ngecek ip gadget lokal
                }
//jika data tertampung di var data, lalu dimasukkan di tabel akses_token
                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

//jika berhasil menginput data token ke akses_token, json menampilkan bahwa Token JWT Tergenerate
                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    } else{
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else{
                res.json({"ERROR": true, "Message": "Email/password salah"});
            }
        }
    });
}