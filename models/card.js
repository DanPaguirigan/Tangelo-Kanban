var Schema = require('mongoose').Schema;
var db = require('./db/db');

var cardSchema = new Schema({
    title: String,
    description: String,
    _parent: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    positionInList: {
        type: Number,
        required: true,
        default: 0
    },
    due: Date,
    _assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{
        name: String,
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    }], comments: [
        {
            _user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required:true
            },comment: String
        }
    ]
});

var Card = db.model('Card', cardSchema);

module.exports = Card;
