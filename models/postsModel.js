var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel');

var postsSchema = new Schema({
    comment: {
        type: String
    },
    likes: Number,
    username: {
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    }
},{
    timestamps: true
});

var postsModel = mongoose.model('posts', postsSchema);
module.exports = postsModel;