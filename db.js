module.exports = function(config){
    var mongoose = require('mongoose');
    mongoose.connect(config.dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // mongoose.set('userFindAndModify', false);
    mongoose.connection.once('open', function(){
        console.log('Connected to database');
    });

    mongoose.connection.on('err', function(err){
        console.log('Error connecting to database');
    });
}