var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: Number,
    year: {
        type: Number,
        required: true
    },
    uni: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;