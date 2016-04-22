var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExerciseUnitSchema   = new Schema({
  name: '',
  userId: Number,
  exerciseId: String,
});

module.exports = mongoose.model('ExerciseUnit', ExerciseUnitSchema);
