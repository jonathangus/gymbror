var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExerciseSchema   = new Schema({
    name: '',
    userId: Number
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
