var Schema = require('mongoose').Schema;
var db = require('./db/db');

var listSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    _board:{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    priority: {
        type:Number,
        required:true,
        default:0
    }
});

var List = db.model('List', listSchema);

module.exports = List;
