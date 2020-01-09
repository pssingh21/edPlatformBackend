var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    }, 
    courses: [String],
    studentsParticipated: Number
},{
    timestamps: true
},{
    unique: true
});

var uniModel = mongoose.model('uni', uniSchema);
module.exports = uniModel;