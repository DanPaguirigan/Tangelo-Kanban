var mongoose = require('mongoose');
var conf = require('../../config.json');
mongoose.connect(conf.db.uri);

module.exports = mongoose;

