var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel');

var postsSchema = new Schema({
    content: {
        type: String
    },
    comment: [{
        username: {
            type: Schema.Types.ObjectId,
            ref: 'username'
        },
        content: {
            type: String
        },
        likes: {
            type: Number
        }
    }],
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