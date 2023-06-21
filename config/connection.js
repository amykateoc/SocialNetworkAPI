const { connect, connection } = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/DATABASENAME');

module.exports = connection;

//this was copied from NoSql activity 22...what is the 'fullnameVirtual' and do we need it?
