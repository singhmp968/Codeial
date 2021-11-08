const mongoose = require('mongoose');
const env = require('./enviroment');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Erroe connecting to mongod"));
db.once('open',function(){
    console.log('connected to DB')
});
module.exports = db;