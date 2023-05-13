//mendaftarkan controller register
var express = require('express');
var auth = require('./auth');
const verification = require('./verif');
var router = express.Router();

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu otorisasi
router.get('api/v1/kepo', verification(2), auth.newpage);

module.exports = router;