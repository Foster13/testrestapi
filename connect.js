var mysql = require('mysql');

//membuat koneksi
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tesrestapi'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('MySQL Terkoneksi');
});

module.exports = conn;