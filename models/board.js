var Schema = require('mongoose').Schema;
var db = require('./db/db');

var boardSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    _owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _members:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

var Board = db.model('Board', boardSchema);

module.exports = Board;
