var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WorkoutSchema  = new Schema({
  userId: '',
  entered_at: {type: Date, required: true, default: Date},
  exerciseUnits: Array
});

module.exports = mongoose.model('Workout', WorkoutSchema);
