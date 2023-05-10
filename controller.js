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

//tampil semua data mhs berdasarkan ID
exports.tampilberdasarkanid = function(req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM tes WHERE id_mhs = ?', [id], 
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok(rows, res)
            }
    });
};

//tambah data mhs
exports.tambahMhs = function(req, res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    
    connection.query("INSERT INTO tes (nim, nama, jurusan) VALUES (?,?,?)",
    [nim, nama, jurusan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else {
                response.ok("Berhasil menambahkan", res);
            }
    });
};

//mengubah data berdasarkan ID
exports.ubahMhs = function(req, res){
    var id_mhs = req.body.id_mhs;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE tes SET nim=?, nama=?, jurusan=? WHERE id_mhs=?',[nim, nama, jurusan, id_mhs],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else {
                response.ok("Berhasil mengubah", res);
            }
    });
};