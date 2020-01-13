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
    },
    uni: {
        type: String,
    },
    courses:{
        type: [String]
    },
    country:{
        type: String,
        required: true
    },
    points: {
        type: Number
    }
},{
    timestamps: true
});

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;