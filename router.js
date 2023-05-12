'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
    
    app.route('/tampil')
        .get(jsonku.tampilsemuamhs);
    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);
    app.route('/tambah')
        .post(jsonku.tambahMhs);
    app.route('/ubah')
        .put(jsonku.ubahMhs);
    app.route('/hapus')
        .delete(jsonku.hapusMhs);
    app.route('/tampilmatakuliah')
        .get(jsonku.tampilgroupmatkul);

};