var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExerciseSessionSchema = new Schema({
  userId: Number,
  exerciseId: String,
  sets: Array,
  entered_at: {type: Date, required: true, default: Date},
});

module.exports = mongoose.model('ExerciseSession', ExerciseSessionSchema);
