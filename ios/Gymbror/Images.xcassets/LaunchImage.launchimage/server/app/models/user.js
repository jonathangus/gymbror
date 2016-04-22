var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
  name: ''
});

module.exports = mongoose.model('User', UserSchema);
