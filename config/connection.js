const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/fullnameVirtual');

module.exports = connection;

//this was copied from NoSql activity 22...what is thee 'fullnameVirtual' and do we need it?
